import { Injectable } from '@angular/core';
import {IProduct} from "./products.service";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../const";

export interface IOrder {
  _id: string
  products: IProduct[]
  price: number
  date: string
  userId: string
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  createOrder(products: IProduct[], price: number)  {
    return this.http.post<IOrder>(BASE_URL+'/orders', {products, price})
  }

  deleteOrder(id: string) {
    return this.http.delete<IOrder>(BASE_URL+'/orders/'+id)
  }

  getOrders() {
    return this.http.get<IOrder[]>(BASE_URL+'/orders')
  }
}
