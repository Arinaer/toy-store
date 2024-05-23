import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {authServiceInitProvider} from "./services/auth-service.service";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {httpInterceptorProviders} from "./interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(TuiRootModule),
    provideHttpClient(withInterceptorsFromDi()),
    httpInterceptorProviders,
    authServiceInitProvider,
  ]
};
