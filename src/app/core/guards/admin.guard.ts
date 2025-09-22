import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.getUser();
  if (auth.isLoggedIn() && user?.role === 'admin') {
    return true;
  }

  // not an admin → redirect to login
  router.navigate(['/auth/login']);
  return false;
};


