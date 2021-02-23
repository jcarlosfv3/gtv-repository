import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../models/login';
import { Response } from '../models/response';
import { User } from '../models/user';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiauthService {
  url: string = 'https://localhost:44327/api/User/login';

  private userSubject: BehaviorSubject<User>;
  public userObservable: Observable<User>;

  public get userData(): User {
    return this.userSubject.value;
  }

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));//verificar este codigo
    this.userObservable = this.userSubject.asObservable();
  }

  login(login: Login): Observable<Response> {
    return this.http
      .post<Response>(this.url, login, httpOption)
      .pipe(
        map((resp) => {
          if (resp.successful === 1) {
            const user: User = resp.data;
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
          }
          return resp;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null!);//verificar este parametro
  }
}
