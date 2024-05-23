import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../const";
import {IProduct} from "./products.service";


export interface ICart {
  userId: string
  products: IProduct[]
  _id: string
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  editCart(cart: ICart, product: IProduct, type?: 'add' | 'delete' | 'clear') {
    if ('clear' === type) {
      return this.http.post<ICart>(BASE_URL+'/cart', {
        ...cart,
        products: []
      })
    }
    const alreadyInCart = this.isInCart(product, cart)
    if (alreadyInCart && type === 'delete') {
      return this.http.post<ICart>(BASE_URL+'/cart', {
        ...cart,
        products: cart.products.filter((item) => item._id !== product._id)
      })
    }
    if (alreadyInCart && type === 'add') {
      return this.http.post<ICart>(BASE_URL+'/cart', {
        ...cart,
        products: [...cart.products, {...product, count: product.count+1}]
      })
    }
    return this.http.post<ICart>(BASE_URL+'/cart', {
      ...cart,
      products: [...cart.products, product]
    })
  }


  deleteFromCart(cart: ICart, product: IProduct) {
    return this.http.post<ICart>(BASE_URL+'/cart', {
      ...cart,
      products: cart.products.filter((item) => item._id !== product._id)
    })
  }

  isInCart(product: IProduct, cart: ICart) {
    if (cart.products.find((item) => item._id === product._id)) {
      return true
    }
    return false
  }


  getCart() {
    return this.http.get<ICart>(BASE_URL+'/cart');
  }
}
