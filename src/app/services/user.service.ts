import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form';
import { LoginForm } from '../interfaces/login-form';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private base_url = environment.base_url;

  constructor(private http: HttpClient, private router: Router) { }

  createUser(formData: RegisterForm) {
    return this.http.post(`${this.base_url}/users`, formData).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${this.base_url}/auth`, formData).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${this.base_url}/auth/google`,{token}).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get<boolean>(`${this.base_url}/auth/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true),
      catchError( error => of(false))
    );
  }

  logout() {
    localStorage.removeItem('token');
    google.accounts.id.revoke('carloshudm@gmail.com', () => {
      this.router.navigateByUrl('auth/login');
    });
  }
}
