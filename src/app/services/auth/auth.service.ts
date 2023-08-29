import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private token: string | null = null;

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

  isAdmin(): boolean {
    if (this.getUserData().role_id == 1) {
      return true
    } else return false
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  setAuthData(token: any, userData: any) {
    localStorage.setItem('token', token)
    localStorage.setItem('userData', JSON.stringify(userData))
  }

  getUserData() {
    const userData = localStorage.getItem('userData')
    if (userData !== null) {
      return JSON.parse(userData)
    }
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    // Memeriksa apakah token tersedia dan belum kadaluarsa
    const token = this.getToken();
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }
}
