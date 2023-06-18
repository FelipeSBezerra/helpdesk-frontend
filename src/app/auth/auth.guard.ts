import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';
import { SnackbarService } from '../service/snackbar.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if(authService.isAuthenticated()){
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
  
};
