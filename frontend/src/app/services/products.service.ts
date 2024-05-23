import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BASE_URL} from "../const";


export interface IProduct {
  _id: string;
  name: string;
  photos: string[];
  description: string;
  categoryId: string;
  count: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(params?: any) {
    let newParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => newParams = newParams.append(key, params[key]));
    }
    return this.http.get<IProduct[]>(BASE_URL+'/products', { params: newParams });
  }

  addProduct(name:string,  photos:string[], categoryId:string, price:number, description?:string ) {
    return this.http.post<IProduct>(BASE_URL+'/products', {
      name, description, photos, categoryId, price
    });
  }

  editProduct(id:string, name:string, photo:string[], description?:string) {
    return this.http.patch(BASE_URL+'/products/'+id, {
      name, description, photo
    });
  }

  deleteProduct(id:string) {
    return this.http.delete(BASE_URL+'/products/'+id);
  }
}
