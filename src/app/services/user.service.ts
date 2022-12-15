import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form';
import { LoginForm } from '../interfaces/login-form';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { ChargeUsers } from '../interfaces/charge-users';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private base_url = environment.base_url;
  user!: User;

  constructor(private http: HttpClient, private router: Router) { }

  //_ Getters 

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return { headers: {
        'x-token': this.token
      }
    }
  }

  //@ CRUD de Usuario

  createUser(formData: RegisterForm) {
    return this.http.post(`${this.base_url}/users`, formData).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    );
  }

  updatePerfil(data: { email: string, name: string, role: string }) {
    data = {
      ...data,
      role: this.user.role!
    }
    return this.http.put(`${this.base_url}/users/${this.uid}`, data, this.headers);
  }

  deleteUser(uid: string) {
    return this.http.delete(`${this.base_url}/users/${uid}`, this.headers);
  }

  //@ AUTH

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

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('auth/login');
  }

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

  //@ Metodo para validar JWT

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

  //@ Metodo para carga en tabla de usuarios

  chargeUsers(from: number = 0) {
    const url: string = `${this.base_url}/users?from=${from}`;
    return this.http.get<ChargeUsers>(url, this.headers).pipe(
      map(resp => {
        const users = resp.users.map( user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid));
        return {
          total: resp.total,
          users
        }
      })
    );
  }

  updateUser(user: User) {
    return this.http.put(`${this.base_url}/users/${user.uid}`, user, this.headers);
  }

}
