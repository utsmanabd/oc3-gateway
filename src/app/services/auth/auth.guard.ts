import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      const refreshToken = this.authService.getRefreshToken()
      let isAuth = false
      if (refreshToken !== null) {
        this.authService.refreshToken(refreshToken).subscribe({
          next: (res: any) => {
            if (!res.error && res.accessToken) {
              this.authService.setToken(res.accessToken);
              isAuth = true
            } else {
              isAuth = false
            }
          },
          error: (err) => { 
            isAuth = false
          }
        })
      } else {
        isAuth = false
      }
      if (!isAuth) {
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      }
      return isAuth
    }
  }
}