import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Anda perlu mengganti ini dengan layanan autentikasi yang sesuai

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
      // Jika pengguna belum login, arahkan mereka ke halaman login
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false
    }
  }
}