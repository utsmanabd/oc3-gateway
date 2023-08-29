import { Component } from '@angular/core';
import { UserData } from './user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData: UserData = {
    nik: null,
    password: '',
  };

  isNIKEmpty: boolean = false;
  isPasswordEmpty: boolean = false;

  isLoginFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.isLoginFailed = false
    this.validateForm();
    if (!this.isNIKEmpty && !this.isPasswordEmpty) {
      this.authService.login(this.loginData.nik, this.loginData.password).subscribe(
        (res: any) => {
          if (!res.error) {
            this.authService.setAuthData(res.token, res.userData)
            this.router.navigate(['/apps'])
          } else {
            console.error(`Failed to login. Error: ${res.message}`);
            this.isLoginFailed = true
          }
        },
        (error) => {
          console.error(`Login failed. Error: ${error}`);
          this.isLoginFailed = true
        }
      )
    }
  }

  validateForm() {
    this.isNIKEmpty = this.loginData.nik === null;
    this.isPasswordEmpty = this.loginData.password.trim() === '';
  }
}
