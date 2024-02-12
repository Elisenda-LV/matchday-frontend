import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Team } from '../../interfaces/team.interface';
import { NgbConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent {

  public teams: Team[] = [];
  public modalService = inject(NgbModal);

  constructor( public teamService: TeamsService, public config: NgbConfig ){
    this.teamService.getListTeams().subscribe((response) => { this.teams = response })
  }

}
