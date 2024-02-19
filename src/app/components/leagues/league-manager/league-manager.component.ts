import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LeagueService } from '../../../services/leagues.service';
import { League } from '../../../interfaces/league.interface';

@Component({
  selector: 'app-league-manager',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,


  ],
  templateUrl: './league-manager.component.html',
  styleUrl: './league-manager.component.scss'
})


export class LeagueManagerComponent implements OnInit {

  public leagueId: string = '';
  //public leagueCard: League[] = [];
  public leagueCard : League = {
    id_league: 0,
    sport_id: 0,
    league_name: '',
    sport: '',
    gender: '',
    category: '',
    description: '',
    location: '',
    create_at: new Date(),
  }

  constructor( public leagueService: LeagueService, public route: ActivatedRoute ){}

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.leagueId = params.get('id')!;

    });

    this.showCard(Number(this.leagueId));

  }

  public showCard(id: any){
    this.leagueService.getLeagueById(id)
      .subscribe({
        next: (data: League) => {
          this.leagueCard = data
          console.log(data)
        },
        error: (error) => {
          console.log('Error while retrieving the league:', error)
        },

      })


  }


}
