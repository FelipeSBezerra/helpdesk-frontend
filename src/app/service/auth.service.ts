import { Observable, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  authenticate(credenciais: Credenciais): Observable<HttpResponse<string>> {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, credenciais, {
      observe: 'response',
      responseType: 'text'
    })
  }

  successfullLogin(authToken: string): void {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem('token');
    if (token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }
}
