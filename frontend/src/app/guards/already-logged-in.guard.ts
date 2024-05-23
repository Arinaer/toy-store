import { CanActivateFn } from '@angular/router';

export const alreadyLoggedInGuard: CanActivateFn = (route, state) => {
  return true;
};
