import { Component } from '@angular/core';
import {TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiErrorModule, TuiHintModule} from "@taiga-ui/core";
import {async} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth-service.service";
import {StorageService} from "../../services/storage.service";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    TuiInputModule,
    TuiErrorModule,
    TuiInputPasswordModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
    TuiHintModule,
    ReactiveFormsModule,
    TuiButtonModule,
    RouterLink,
    NgbAlert,
    NgIf
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    nameValue: new FormControl('', Validators.required),
    passwordValue: new FormControl('', Validators.required)
  });
  isLoginFailed: boolean = false;
  errorMessage: string = '';
  role: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }
  f (key: string) { return this.loginForm.get(key); }
  submitLogin() {
    const {nameValue, passwordValue} = this.loginForm.value;
    if (!nameValue || !passwordValue) {
      return;
    }

    this.authService.login(nameValue, passwordValue).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.authService.isLoggedIn = true;
        this.role = this.storageService.getUser().role;
        this.router.navigate(['']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(err.error);
        this.isLoginFailed = true;
      }
    })
  }


}
