import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Team } from '../interfaces/team.interface';

const API_URL = environment.endpoint;

@Injectable({providedIn: 'root'})


export class TeamsService {

  constructor(private httpClient: HttpClient) {}

  getListTeams(): Observable<Team[]>{
    return this.httpClient.get<Team[]>(`${API_URL}teams`)

  }

  getTeamById(id: number){
    return this.httpClient.get<Team[]>(`${API_URL}teams/${id}`);

  }

  deleteTeam(id: number): Observable<any>{
    return this.httpClient.delete<Team[]>(`${API_URL}teams/${id}`);

  }

  addLeague(body: Team): Observable<any>{
    return this.httpClient.post<Team>(`${API_URL}teams`, body)

  }

  updateLeague(body: Team):Observable<any>{
    const id = body.id_team;
    console.log(body);
    return this.httpClient.patch<Team>(`${API_URL}teams/${id}`, body);
  }



}
