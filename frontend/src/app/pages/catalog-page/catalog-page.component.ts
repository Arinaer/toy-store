import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiInputModule, TuiInputRangeModule} from "@taiga-ui/kit";
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {TuiLetModule} from "@taiga-ui/cdk";
import {CommonModule, NgForOf} from "@angular/common";
import {CategoryService, ICategory} from "../../services/category-service.service";
import {catchError, Observable, of, take, tap} from "rxjs";
import {IProduct, ProductsService} from "../../services/products.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CartService, ICart} from "../../services/cart.service";
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputRangeModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiLetModule,
    NgForOf,
    TuiInputModule,
    CommonModule,
    TuiDataListModule,
    TuiSvgModule,
    RouterLink,
    TuiLoaderModule
  ],
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.scss'
})
export class CatalogPageComponent implements OnInit {
  readonly testForm = new FormGroup({
    minMaxPrice: new FormControl([0, 50000]),
    categoryId: new FormControl({} as ICategory),
    name: new FormControl('')
  });
  readonly min = 0;
  readonly max = 50000;
  readonly sliderStep = 500;
  readonly steps = (this.max - this.min) / this.sliderStep;
  readonly quantum = 0.00001;
  isLoading = false
  categories$!: Observable<ICategory[]>;
  products$!: Observable<IProduct[]>
  cart!: ICart
  favorites!: IProduct[]

  constructor(
    private categoriesService: CategoryService,
    private productsService: ProductsService,
    private favoriteService: FavoriteService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit() {
    // debugger
    this.isLoading = true
    const categoryId = this.route.snapshot.params['category'];
    this.categories$ = this.categoriesService.getCategories()
    this.products$ = this.getProducts({categoryId})
      .pipe(
        tap(() => this.isLoading = false),
        catchError(() => {
          this.isLoading = false
          return []
        })
      )
    this.cartService.getCart()
      .pipe(
        take(1),
        catchError(() => {
          return []
        })
      )
      .subscribe(cart => {
        this.cart = cart
      })
    this.favorites = this.favoriteService.getFromStorage('favorites')
  }

  open = false;
  openSettings = false;

  index = 0;

  onClick(): void {
    this.open = false;
    this.index = 1;
  }

  get f () {
    return this.testForm
  }

  getProducts(params?: any) {
    return this.productsService.getProducts(params)
  }

  submitFilters() {
    console.log(this.testForm.value)
    this.isLoading = true
    const filters = {
      name: this.f.value.name,
      // @ts-ignore
      minPrice: this.f.value.minMaxPrice[0],
      // @ts-ignore
      maxPrice: this.f.value.minMaxPrice[1],
      categoryId: this.f.value.categoryId?._id || this.route.snapshot.params['category'],

    }
    this.products$ = this.getProducts(filters)
      .pipe(tap(() => this.isLoading = false))
  }

  showClearButton(): boolean {
    return this.testForm.dirty;
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
        console.log('error')
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


  clearForm(): void {
    this.isLoading = true
    const categoryId = this.route.snapshot.params['category'];
    this.testForm.reset();
    this.testForm.value.minMaxPrice = [0, 50000];
    this.testForm.value.name = ''
    this.products$ = this.getProducts({categoryId})
      .pipe(tap(() => this.isLoading = false))
  }


  onSelected(category: ICategory): void {
    this.testForm.get('categoryId')!.setValue(category);
  }
}
