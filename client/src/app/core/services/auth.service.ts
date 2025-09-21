import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthLoginRequest, AuthResponse, AuthSignupRequest } from '../../../assets/models/backendModels';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiBaseUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  login(body: AuthLoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/login`, body).pipe(
      tap(res => localStorage.setItem('auth_token', res.token))
    );
  }

  signup(body: AuthSignupRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/signup`, body).pipe(
      tap(res => localStorage.setItem('auth_token', res.token))
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  get token(): string | null {
    return localStorage.getItem('auth_token');
  }
}