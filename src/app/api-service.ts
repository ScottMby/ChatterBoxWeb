import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth-service';
import { switchMap, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  authService = inject(AuthService);

  constructor(private http: HttpClient) { }

  authorizedPostRequest(body : any, url : string) : Observable<any> //Used when a user must be logged in to perform a post request
  {
    return this.authService.getAuthToken()?.pipe(switchMap((token: string) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Include the token in the Authorization header
      });

      return this.http.post<any>(url, body, { headers });
    }));
  }
}
