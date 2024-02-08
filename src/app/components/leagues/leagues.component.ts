import { Component, OnInit, inject } from '@angular/core';
import { League } from '../../interfaces/league.interface';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LeagueService } from '../../services/leagues.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddLeagueComponent } from './add-league/add-league.component';
import { LeagueManagerComponent } from './league-manager/league-manager.component';


@Component({
  selector: 'app-leagues',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './leagues.component.html',
  styleUrl: './leagues.component.scss'
})


export class LeaguesComponent {

  public leagues: League[] = [];
  public modalService = inject(NgbModal);

  constructor(
    public leagueService: LeagueService, public config: NgbModalConfig){

    this.leagueService.getListLeagues().subscribe((response) => {this.leagues = response})

  }


  //TODO: add league button --> open modal with form:

  addLeagueModal(){
    this.modalService.open(AddLeagueComponent)

  }








}

