import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';
import { inject } from '@angular/core';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  
const authService = inject(AdminAuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/admin/auth/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};

export const superAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.isSuperAdmin()) {
    return true;
  }

  if (authService.isLoggedIn()) {
    router.navigate(['/admin/dashboard']);
  } else {
    router.navigate(['/admin/auth/login']);
  }
  return false;
};

export const adminRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }

  if (authService.isLoggedIn()) {
    router.navigate(['/admin/dashboard']);
  } else {
    router.navigate(['/admin/auth/login']);
  }
  return false;
};

export const teacherGuard: CanActivateFn = (route, state) => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.isTeacher()) {
    return true;
  }

  if (authService.isLoggedIn()) {
    router.navigate(['/admin/dashboard']);
  } else {
    router.navigate(['/admin/auth/login']);
  }
  return false;
};
