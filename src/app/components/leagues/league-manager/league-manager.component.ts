import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LeagueService } from '../../../services/leagues.service';
import { League } from '../../../interfaces/league.interface';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditLeagueComponent } from './edit-league/edit-league.component';
import { DeleteLeagueComponent } from './delete-league/delete-league.component';

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

  public league: League[] = [];
  public leagueId: string = '';
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

  constructor(
    public leagueService: LeagueService,
    public route: ActivatedRoute,
    public modalService: NgbModal,
    public config: NgbModalConfig,


  ){}

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.leagueId = params.get('id')!;

    });

    this.showCard(Number(this.leagueId));

  }

  //Get league by id:

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

  // To open update and delete league modal, only admin users:

  public editLeagueModal(leagueCard: League){
    const modalRef = this.modalService.open(EditLeagueComponent)
    modalRef.componentInstance.leagueCard = leagueCard;

  }

  /* public deleteLeagueModal(leagueId: number){
    const modalRef = this.modalService.open(DeleteLeagueComponent)
    modalRef.componentInstance.leagueCard = leagueId;
  } */


}
