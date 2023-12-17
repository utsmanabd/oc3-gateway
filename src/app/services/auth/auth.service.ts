import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  login(nik: any, password: string) {
    return this.httpClient.post(
      environment.AUTH_URL + environment.login,
      {
        nik,
        password,
      },
      this.httpOptions
    );
  }

  apiLogin(nik: string, password: string) {
    return this.httpClient.post(environment.AUTH_URL + environment.loginApi, { username: nik, password: password }, this.httpOptions)  
  }

  refreshToken(refreshToken: string) {
    return this.httpClient.post(environment.AUTH_URL + environment.refreshToken, { refreshToken: refreshToken }, this.httpOptions)
  }

  isAdmin(): boolean {
    if (this.getUserData().role_id == 1) {
      return true
    } else return false
  }

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');
  }

  setAuthData(token: any, refreshToken: any, userData: any) {
    this.setToken(token)
    localStorage.setItem('refreshToken', refreshToken)
    this.setUserData(userData)
  }

  getUserData() {
    const userData = localStorage.getItem('userData')
    if (userData !== null) {
      return JSON.parse(userData)
    }
  }

  setUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData))
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken')
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

}
