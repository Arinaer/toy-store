import { Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {AboutPageComponent} from "./pages/about-page/about-page.component";
import {CartPageComponent} from "./pages/cart-page/cart-page.component";
import {CatalogPageComponent} from "./pages/catalog-page/catalog-page.component";
import {ProductPageComponent} from "./pages/product-page/product-page.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {alreadyLoggedInGuard} from "./guards/already-logged-in.guard";
import {authGuard} from "./guards/auth.guard";
import {adminGuard} from "./guards/admin.guard";

export const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "login", component: LoginPageComponent, canActivate: [alreadyLoggedInGuard] },
  { path: "register", component: RegisterPageComponent, canActivate: [alreadyLoggedInGuard] },
  { path: "profile", component: ProfilePageComponent, canActivate: [authGuard] },
  // { path: "catalog/:category", component: CatalogPageComponent },
  { path: "catalog", component: CatalogPageComponent },
  { path: "catalog/:category/:id", component: ProductPageComponent },
  { path: "cart", component: CartPageComponent, canActivate: [authGuard] },
  { path: "about", component: AboutPageComponent },
  {
    path: "admin",
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [adminGuard]
  },
  { path: "**", component: NotFoundPageComponent }
];
