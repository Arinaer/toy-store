import { Component } from '@angular/core';
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";
import {NgOptimizedImage} from "@angular/common";
import {SubscriptionService} from "../../services/subscription.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {catchError, take} from "rxjs";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgbCarousel,
    NgbSlide,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  images = [1, 2, 3, 4, 5].map((n) => `/assets/slides/slide-${n}.webp`);
  brands = new Array(15)
  email = new FormControl('')

  constructor(private subService: SubscriptionService) {
  }

  create() {
    console.log(this.email.value, 'this.email.value)')
    if (this.email.value) {
      this.subService.createSubscription(this.email.value)
        .pipe(
          take(1),
          catchError(() => {
            alert('Ошибка создания подписки')
            return []
          })
        ).subscribe(
        () => {
          alert('Успешно')
        }
      )
    }
  }
}
