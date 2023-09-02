import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  isOnRefresh: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      const refreshToken = this.authService.getRefreshToken();
      if (refreshToken !== null) {
        this.refreshToken(refreshToken)
      } else {
        return;
      }
    } else {
      this.isOnRefresh = true
      this.router.navigate(['/'])
    }
  }

  refreshToken(token: any) {
    this.isOnRefresh = true
    this.authService.refreshToken(token).subscribe({
      next: (res: any) => {
        if (!res.error && res.accessToken) {
          this.authService.setToken(res.accessToken);
        } else {
          console.error(res.message)
          this.isOnRefresh = false
        }
      },
      error: (err) => console.error(err),
      complete: () => {
        this.router.navigate(['/apps'])
        this.isOnRefresh = false
      }
    })
  }
}
