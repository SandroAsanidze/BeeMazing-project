import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLogged = localStorage.getItem('isLogged');
  const router = inject(Router)

  if(isLogged === 'true') {
    router.navigate(['home']);
    return false;
  }
  else {
    return true;
  }
};
