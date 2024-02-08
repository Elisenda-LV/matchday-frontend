import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user.interface';


const API_URL = environment.endpoint;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({providedIn: 'root'})

export class UsersService {

  public userToken = signal<string>('');

  constructor(private httpClient: HttpClient) {
    const token = localStorage.getItem('accessToken');
    token ? this.userToken.set(token) : this.userToken.set('')

  }

  // Add a new user:
  users(data: string): Observable<User>{
    return this.httpClient.post<User>(`${API_URL}users`, data, httpOptions)
  }

  // Log out: Remove user token
  logout(): void {
    localStorage.removeItem('accessToken');
    this.userToken.set('');
  }

  isEmailRegistered(email: string): Observable<boolean>{
    return this.httpClient.get<User[]>(`${API_URL}users?email=${email}`).pipe(
      map(users => users.length > 0));
  }

  updateUser(accessToken: string): void{
    localStorage.setItem('accesToken', accessToken);
    this.userToken.set(accessToken)

  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('accessToken') ? true : false;

  }

}
