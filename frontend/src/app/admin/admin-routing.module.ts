import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {ProductsComponent} from "./components/products/products.component";

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
      {path: 'categories', component: CategoriesComponent},
      {path: 'products', component: ProductsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
