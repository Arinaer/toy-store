import { Component } from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {TuiButtonModule, TuiErrorModule} from "@taiga-ui/core";
import {TuiFieldErrorPipeModule, TuiInputDateModule, TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {AuthService} from "../../services/auth-service.service";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-register-page',
  standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        TuiButtonModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiInputDateModule,
        TuiInputModule,
        TuiInputPasswordModule
    ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  testForm = new FormGroup({
    nameValue: new FormControl('', Validators.required),
    emailValue: new FormControl('', Validators.required),
    passwordValue: new FormControl('', Validators.required)
  });

  isLoginFailed: boolean = false;
  errorMessage: string = '';
  role: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }
  f (key: string) { return this.testForm.get(key); }
  submit() {
    const {emailValue, passwordValue, nameValue} = this.testForm.value;
    if (!nameValue || !passwordValue || !emailValue) {
      return;
    }

    this.authService.register(emailValue, passwordValue, nameValue).subscribe({
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
