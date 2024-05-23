import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../const";

export interface ICategory {
  _id: string;
  name: string;
  photo: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<ICategory[]>(BASE_URL+'/categories');
  }

  addCategory(name:string, photo:string, description?:string) {
    return this.http.post<ICategory>(BASE_URL+'/categories', {
      name, description, photo
    });
  }

  editCategory(id:string, name:string, photo:string, description?:string) {
    return this.http.patch(BASE_URL+'/categories/'+id, {
      name, description, photo
    });
  }

  deleteCategory(id:string) {
    return this.http.delete(BASE_URL+'/categories/'+id);
  }
}
