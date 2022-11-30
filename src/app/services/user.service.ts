import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form';
import { LoginForm } from '../interfaces/login-form';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private base_url = environment.base_url;
  user!: User;

  constructor(private http: HttpClient, private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  //_ Metodo para crear usuario
  createUser(formData: RegisterForm) {
    return this.http.post(`${this.base_url}/users`, formData).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    );
  }

  //_ Metodo para logear a usuario
  login(formData: LoginForm) {
    return this.http.post(`${this.base_url}/auth`, formData).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    );
  }

  //_ Metodo para logear a usuario por google
  loginGoogle(token: string) {
    return this.http.post(`${this.base_url}/auth/google`,{token}).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  //_ Metodo para validar JWT
  validateToken(): Observable<boolean> {

    return this.http.get<boolean>(`${this.base_url}/auth/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp:any) => {
        const {email, google, name, img, role, uid} = resp.user;
        this.user = new User(name, email, '', img, google, role, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError( error => {
        console.log(error);
        return of(false);
      })
    );
  }

  //_ Metodo para deslogear a usuario de google
  logoutGoogle() {
    try {
      localStorage.removeItem('token');
      google.accounts.id.revoke('carloshudm@gmail.com', () => {
        this.router.navigateByUrl('auth/login');
      });
    } catch (error) {
      console.warn(error);
    }
  }

  //_ Metodo para deslogear a usuario
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('auth/login');
  }

  //_ Metodo para actualizar perfil de usuario
  updatePerfil(data: {email: string, name: string, role: string}) {

    return this.http.put(`${this.base_url}/users/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }
}
