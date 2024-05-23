import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {TuiButtonModule, TuiLoaderModule, TuiSvgModule} from "@taiga-ui/core";
import {IProduct} from "../../services/products.service";
import {FavoriteService} from "../../services/favorite.service";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {CartService, ICart} from "../../services/cart.service";
import {catchError, Observable, take, tap} from "rxjs";
import {IOrder, OrdersService} from "../../services/orders.service";
import {AuthService} from "../../services/auth-service.service";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TuiSvgModule,
    NgClass,
    NgIf,
    AsyncPipe,
    NgForOf,
    TuiButtonModule,
    TuiLoaderModule
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit{
  isLoading = false
  route: 'profile' | 'orders' | 'favorites' = 'profile'
  user!: any
  favorites!: IProduct[]
  cart!: ICart
  orders$!: Observable<IOrder[]>

  constructor(
    private favoriteService: FavoriteService,
    private cartService: CartService,
    private orderService: OrdersService,
    private authService: AuthService,
    private router: Router
  ) {

  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  getName() {
    return this.authService.getName()
  }

  ngOnInit() {
    this.isLoading = true
    this.favorites = this.favoriteService.getFromStorage('favorites')
    this.orders$ = this.orderService.getOrders().pipe(
      take(1),
      catchError(() => {
        this.isLoading = false
        return []
      }),
      tap(() => this.isLoading = false)
    )
    this.cartService.getCart()
      .pipe(
        take(1),
        catchError(() => {
          this.isLoading = false
          return []
        })
      )
      .subscribe(cart => {
        this.isLoading = false
        this.cart = cart
      })
  }

  logout(){
    this.authService.logout()
      .pipe(
        take(1),
        catchError(() => {
          return [];
        })
      )
      .subscribe(cart => {
        this.router.navigate(['']);
      });
    this.router.navigate(['']);
  }

  changeRoute(route: 'profile' | 'orders' | 'favorites') {
    this.route = route
  }

  addToFavorites(product: IProduct): void {
    this.favorites = this.favoriteService.addToFavorites(product)
  }

  alreadyFavorite(product: IProduct): boolean {
    return this.favoriteService.alreadyFavorite(product)
  }

  addToCart(product: IProduct): void {
    this.cartService.editCart(this.cart, product, 'delete')
      .pipe(
        take(1),
        catchError(() => {
          return []
        })
      )
      .subscribe(cart => {
        this.cart = cart
      })
  }

  inCart(product: IProduct): boolean {
    return this.cartService.isInCart(product, this.cart)
  }

}
