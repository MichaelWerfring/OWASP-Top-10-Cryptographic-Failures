import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  return true;
};
