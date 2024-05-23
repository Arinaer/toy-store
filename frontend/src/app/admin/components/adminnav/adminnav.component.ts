import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-adminnav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './adminnav.component.html',
  styleUrl: './adminnav.component.scss'
})
export class AdminnavComponent {

}
