import {Component, OnInit} from '@angular/core';
import {TuiLoaderModule, TuiSvgModule} from "@taiga-ui/core";
import {tuiIconHeart, tuiIconMinus, tuiIconPlus, tuiIconTrash} from "@taiga-ui/icons";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {CartService, ICart} from "../../services/cart.service";
import {IProduct} from "../../services/products.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ICategory} from "../../services/category-service.service";
import {FavoriteService} from "../../services/favorite.service";
import {catchError, take, tap} from "rxjs";
import {OrdersService} from "../../services/orders.service";

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    TuiSvgModule,
    NgForOf,
    AsyncPipe,
    TuiLoaderModule,
    NgIf,
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  protected readonly tuiIconTrash = tuiIconTrash;
  protected readonly tuiIconHeart = tuiIconHeart;
  protected readonly tuiIconMinus = tuiIconMinus;
  protected readonly tuiIconPlus = tuiIconPlus;
  cartItems: string[] = new Array(3);
  readonly cartForm = new FormGroup({

  });

  isLoading = false
  cart!: ICart
  favorites!: IProduct[]


  constructor(
    private favoriteService: FavoriteService,
    private cartService: CartService,
    private orderService: OrdersService
  ) {
  }

  ngOnInit() {
    this.isLoading = true
    this.cartService.getCart()
      .pipe(
        take(1),
        catchError(() => {
          this.isLoading = false
          return []
        })
      )
      .subscribe(cart => {
        this.cart = cart
        this.isLoading = false
      })
    this.favorites = this.favoriteService.getFromStorage('favorites')
  }

  get f () {
    return this.cartForm
  }

  createOrder() {
    this.isLoading = true
    this.orderService.createOrder(this.cart.products, this.sumOfCart())
      .pipe(
        take(1),
        catchError(() => {
          alert('Ошибка')
          return []
        })
      ).subscribe(() => {
        this.isLoading = false
        this.cart.products = []
        this.cartService.editCart(this.cart, {} as IProduct, 'clear').pipe(
          take(1),
          catchError(() => {
            alert('Ошибка')
            this.isLoading = false
            return []
          })
        ).pipe(
          tap(() => {
            alert('Заказ успешно создан')
          })
        ).subscribe(data => {

        })
    })
  }

  sumOfCart() {
    let sum = 0
    this.cart.products.forEach(product => {
      sum += product.price
    })
    return sum - 1480
  }

  submit() {
    console.log(this.cartForm.value)
  }

  addToFavorites(product: IProduct): void {
    this.favorites = this.favoriteService.addToFavorites(product)
  }

  alreadyFavorite(product: IProduct): boolean {
    return this.favoriteService.alreadyFavorite(product)
  }

  deleteFromCart(product: IProduct) {
    this.cartService.deleteFromCart(this.cart, product)
      .pipe(
        take(1),
        catchError(() => {
          console.log('error')
          return []
        })
    )
      .subscribe(cart => {
        this.cart = cart
      })
  }
}
