import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const auth = inject(AuthService).isAuth();

  return auth || router.navigate(['unauthorized']);
};