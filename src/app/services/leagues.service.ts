import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { League } from '../interfaces/league.interface';

const API_URL = environment.endpoint;

@Injectable({providedIn: 'root'})


export class LeagueService {

  constructor(private httpClient: HttpClient) { }

  getListLeagues(): Observable<League[]>{
    return this.httpClient.get<League[]>(`${API_URL}leagues`)

  }

  getLeagueById(id: number): Observable<any>{
    return this.httpClient.get<League[]>(`${API_URL}leagues/${id}`);
  }

  deleteLeague(id: number): Observable<any>{
    return this.httpClient.delete<League[]>(`${API_URL}leagues/${id}`);

  }

  addLeague(body: League): Observable<any>{
    return this.httpClient.post<League>(`${API_URL}leagues`, body)

  }

  updateLeague(body: League):Observable<any>{
    const id = body.id_league;
    console.log(body);
    return this.httpClient.patch<League>(`${API_URL}leagues/${id}`, body);
  }



}
