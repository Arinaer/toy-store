import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AdminnavComponent} from "../adminnav/adminnav.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    AdminnavComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
