import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FormControl} from "@angular/forms";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {CategoryService, ICategory} from "../../services/category-service.service";
import {Observable} from "rxjs";
import { AuthService } from '../../services/auth-service.service';
import {TuiSvgModule} from "@taiga-ui/core";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgForOf,
    NgbDropdownModule,
    AsyncPipe,
    NgIf,
    TuiSvgModule,
    NgClass,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'

})
export class NavComponent implements OnInit {
  categories!: Observable<ICategory[]>;

  open = false;

  selected = new FormControl();

  opennav() {
    this.open = !this.open
  }

  constructor(private categoryService: CategoryService, private authService: AuthService) {
  }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
  }

  get isAdmin () {
    return this.authService.isAdmin();
  }
}
