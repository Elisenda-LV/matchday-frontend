import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.endpoint;

@Injectable({providedIn: 'root'})

export class UsersService {

  constructor(private httpClient: HttpClient) { }

}
