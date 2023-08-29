import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public httpOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
    };
  }

  constructor(private httpClient: HttpClient) {}

  // Application Endpoints
  getCustomApps(userId: number) {
    return this.httpClient.get<any>(
      environment.API_URL + environment.userAppId + userId,
      this.httpOptions()
    );
  }

  insertCustomApp(data: any) {
    return this.httpClient.post<any>(
      environment.API_URL + environment.userApp,
      { form_data: data },
      this.httpOptions()
    );
  }

  deleteCustomApp(customId: number) {
    return this.httpClient.delete<any>(
      environment.API_URL + environment.userAppId + customId,
      this.httpOptions()
    );
  }

  getAllApps() {
    return this.httpClient.get<any>(
      environment.API_URL + environment.applications,
      this.httpOptions()
    );
  }

  insertApp(data: any) {
    return this.httpClient.post<any>(
      environment.API_URL + environment.applications,
      { form_data: data },
      this.httpOptions()
    );
  }

  updateApp(id: number, data: any) {
    return this.httpClient.put<any>(
      environment.API_URL + environment.applicationId + id,
      { form_data: data },
      this.httpOptions()
    );
  }

  deleteApp(id: number) {
    return this.httpClient.delete<any>(
      environment.API_URL + environment.applicationId + id,
      this.httpOptions()
    );
  }

  // Image Handler Endpoints

  getImage(filename: string) {
    return this.httpClient.get<any>(
      environment.API_URL + environment.getImage + filename,
      this.httpOptions()
    );
  }

  insertImage(file: any) {
    return this.httpClient.post<any>(
      environment.API_URL + environment.image,
      { file: file },
      this.httpOptions()
    );
  }

  deleteImage(filename: string) {
    return this.httpClient.delete<any>(
      environment.API_URL + environment.image + filename,
      this.httpOptions()
    );
  }
}
