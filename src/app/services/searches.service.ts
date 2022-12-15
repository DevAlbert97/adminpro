import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  search(type: 'users' | 'hospitals' | 'doctors', term: string) {
    const url: string = `${base_url}/search/collection/${type}/${term}`;

    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp:any) => {
        switch (type) {
          case 'users':
            return this.transformUsers(resp.results);
          case 'hospitals':
            return [];            
          case 'doctors':
            return [];       
          default:
            return [];
        }
      })
    );
  }

  transformUsers(results: any): User[] {
    return results.map(
      (user:any) => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }



}
