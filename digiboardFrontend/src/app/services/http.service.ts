import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Pinboard} from "../models/pinboard";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  SERVER_URL = 'http://localhost:8080/';
  user: User;

  constructor(
    private http: HttpClient
  ) { }

  login(loginUser): Observable<User> {
    return this.http.post<User>(this.SERVER_URL + 'user/login', loginUser);
  }

  getPinboards(uid): Observable<Array<Pinboard>> {
    return this.http.get<Array<Pinboard>>(this.SERVER_URL + 'user/' + uid + '/pinboards');
  }
}
