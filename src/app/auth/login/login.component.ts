import { Component } from '@angular/core';
import { UserData } from './user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginData: UserData = {
    nik: null,
    password: '',
  };

  isNIKEmpty: boolean = false;
  isPasswordEmpty: boolean = false;

  isLoginFailed: boolean = false;
  isRemembered: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('login clicked')
    this.isLoginFailed = false;
    this.validateForm();
    if (!this.isNIKEmpty && !this.isPasswordEmpty) {
      this.authService
        .login(this.loginData.nik, this.loginData.password)
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
              console.log(
                'Refresh token:' + this.authService.getRefreshToken()
              );
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
      console.log('Remembered');
    } else {
      this.isRemembered = false;
      console.log('NotRemembered');
    }
  }

  validateForm() {
    this.isNIKEmpty = this.loginData.nik === null;
    this.isPasswordEmpty = this.loginData.password.trim() === '';
  }
}
