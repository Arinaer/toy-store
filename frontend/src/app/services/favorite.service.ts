import { Injectable } from '@angular/core';
import {IProduct} from "./products.service";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor() { }

  clear() {
    localStorage.setItem('favorites', JSON.stringify([]));
  }

  alreadyFavorite(product: IProduct): boolean {
    const favorites = this.getFromStorage('favorites') || [];
    return !!favorites.find((item) => item._id === product._id);
  }

  addToFavorites(product: IProduct): IProduct[] {
    const favorites = this.getFromStorage('favorites') || [];
    if (this.alreadyFavorite(product)) {
      const filtered = favorites.filter((item) => item._id !== product._id);
      localStorage.setItem('favorites', JSON.stringify(filtered));
      return filtered
    }
    favorites.push(product);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return favorites
  }

  getFromStorage(key: string): IProduct[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }


}
