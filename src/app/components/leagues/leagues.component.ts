import { Component, OnInit, inject } from '@angular/core';
import { League } from '../../interfaces/league.interface';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LeagueService } from '../../services/leagues.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddLeagueComponent } from './add-league/add-league.component';
import { LeagueManagerComponent } from './league-manager/league-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeagueFiltersComponent } from './league-filters/league-filters.component';


@Component({
  selector: 'app-leagues',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, LeagueFiltersComponent],
  templateUrl: './leagues.component.html',
  styleUrl: './leagues.component.scss'
})


export class LeaguesComponent {

  public leagues: League[] = [];
  public modalService = inject(NgbModal);

  public initialFilters: { gender?: string, category?: string, sport?: string } = {};
  public filteredLeagues: League[] = [];
  public filtersApplied: boolean = false;

  constructor(
    public leagueService: LeagueService, public config: NgbModalConfig){
    this.leagueService.getListLeagues().subscribe((response) => {this.leagues = response})

    this.filteredLeagues = [...this.leagues];

  }


  addLeagueModal(){
    this.modalService.open(AddLeagueComponent)

  }

  //TODO: Search League by Name

  searchLeaguebyName(){}


  //TODO: Filters by sport, gender and category

  public applyFilters(filters: { gender?: string, category?: string, sport?: string }) {
    this.leagueService.filterLeagues(filters).subscribe(filteredLeagues => {
      this.filteredLeagues = filteredLeagues;
      console.log(filteredLeagues)
      this.filtersApplied = true;
    });


  }

  public resetFilters() {
    this.initialFilters = {};
    this.applyFilters(this.initialFilters);

  }






}

