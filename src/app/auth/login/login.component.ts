import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  nik: string = '';
  password: string = '';

  isNIKEmpty: boolean = false;
  isPasswordEmpty: boolean = false;

  isLoginFailed: boolean = false;
  isRemembered: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.isLoginFailed = false;
    this.validateForm();
    if (!this.isNIKEmpty && !this.isPasswordEmpty) {
      this.authService
        .apiLogin(this.nik, this.password)
        .subscribe({
          next: (res: any) => {
            if (!res.error) {
              if (!this.isRemembered) {
                this.authService.setToken(res.token);
                this.authService.setUserData(res.userData);
              } else {
                this.authService.setAuthData(
                  res.token,
                  res.refreshToken,
                  res.userData
                );
              }
              this.router.navigate(['/apps']);
            } else {
              console.error(`Failed to login. Error: ${res.message}`);
              this.isLoginFailed = true;
            }
          },
          error: (err: any) => {
            console.error(err);
            this.isLoginFailed = true;
          },
        });
    }
  }

  onRememberMeChecked() {
    if (!this.isRemembered) {
      this.isRemembered = true;
    } else {
      this.isRemembered = false;
    }
  }

  validateForm() {
    this.isNIKEmpty = this.nik.trim() === '';
    this.isPasswordEmpty = this.password.trim() === '';
  }
}
