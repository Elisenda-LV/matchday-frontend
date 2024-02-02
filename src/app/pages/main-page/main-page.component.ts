import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { League } from '../../interfaces/league.interface';
import { LeagueService } from '../../services/leagues.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})


export class MainPageComponent {

  public leagues: League[] = [];

  constructor( public leagueService: LeagueService ){

    this.leagueService.getListLeagues().subscribe((response) => {this.leagues = response})

  }


}
