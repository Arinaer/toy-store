import {HttpClient, HttpHeaders} from '@angular/common/http';
import {APP_INITIALIZER, Injectable, Provider} from '@angular/core';
import {StorageService} from "./storage.service";
import {Router} from "@angular/router";
import {BASE_URL} from "../const";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post(BASE_URL+'/auth'+'/login', {email, password}, httpOptions);
  }

  register(email: string, password: string, name: string) {
    return this.http.post(BASE_URL+'/auth'+'/register', {email, password, name}, httpOptions);
  }

  refresh() {
    return this.http.get(BASE_URL+'/auth'+'/refresh', httpOptions);
  }

  logout() {
    this.storageService.clear();
    return this.http.post(BASE_URL+'/auth'+'/logout', {}, httpOptions);
  }

  getName() {
    return this.storageService.getUser()?.user?.name
  }

  init() {
    this.refresh().subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoggedIn = true;
        this.router.navigate(['']);
      },
      error: err => {
        this.storageService.clear();
        this.isLoggedIn = false;
      }
    })
  }
  /**Функция для проверки роли пользователя*/
  isAdmin() {
    return this.storageService.getUser()?.user?.role.includes('admin');
  }
}


export const authServiceInitProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: (authService: AuthService) => () => authService.init(),
  deps: [AuthService],
  multi: true,
};
