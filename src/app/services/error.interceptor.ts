import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!request.url.includes('auth/login') && error.status === 401) {
          // Unauthorized: Logout user
          this.logOut()
        } else if (error.status === 403) {
          // Forbidden: Attempt to refresh token
          return this.handleForbiddenError(request, next);
        }
        return throwError(error);
      })
    );
  }

  private handleForbiddenError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Call refreshToken() and retry the original request
    let refreshToken = this.authService.getRefreshToken()
    if (refreshToken !== null) {
        return this.authService.refreshToken(refreshToken).pipe(
            switchMap((response: any) => {
              if (response.accessToken) {
                // Refresh token successful, update the token
                this.authService.setToken(response.accessToken);
                // Clone the original request with the new token
                const newRequest = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${response.accessToken}`
                  }
                });
                // Retry the request with the new token
                return next.handle(newRequest);
              } else {
                // Refresh token failed: Logout user
                this.logOut()
                return throwError('Refresh token failed');
              }
            })
          );
    } else {
        this.logOut()
        return throwError('Refresh token failed');
    }
  }

  private logOut() {
    this.authService.logout();
    // this.router.navigate(['auth/login']);
    location.reload();
  }
}
