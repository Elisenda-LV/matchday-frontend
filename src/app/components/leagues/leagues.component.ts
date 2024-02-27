import { Component, inject } from '@angular/core';
import { League } from '../../interfaces/league.interface';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LeagueService } from '../../services/leagues.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddLeagueComponent } from './add-league/add-league.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';




@Component({
  selector: 'app-leagues',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './leagues.component.html',
  styleUrl: './leagues.component.scss'
})


export class LeaguesComponent {

  public leagues: League[] = [];
  public foundLeague: League[] = [];
  public showFoundLeagueCard = false;
  public filteredLeagues: League[] = [];

  constructor(
    public leagueService: LeagueService,
    public router: Router,
    public modalService: NgbModal,
    public config: NgbModalConfig

  ){
      this.leagueService.getListLeagues()
        .subscribe({
          next: ((data: League[]) => {
            this.leagues = data,
            this.leagues.forEach(league => {
              league.id_league = league.id_league;
              console.log(league)

            })

          })
      });

  }

  // To open modal, only admin users:

  addLeagueModal(){
    this.modalService.open(AddLeagueComponent)

  }


  // To show league-manager:

  public viewLeague(id: number) {
    if(id){
      this.router.navigate(['/leagues', id]);
    }else{
      console.error('Id undefined o null');
    }
  }


  //Search League by Name

  searchForm = new FormGroup({
    search : new FormControl('', [Validators.required, Validators.maxLength(20),])

  })

  searchLeaguebyName(){

    let searchLeague = this.searchForm.get('search')!.value?.toLowerCase() || '';

    if (searchLeague.trim() !== '') {
      const foundLeague = this.leagues.find(league =>
        league.league_name.toLowerCase().includes(searchLeague)

      );
      console.log(foundLeague)
      if (foundLeague) {
        this.showFoundLeagueCard = true;
        // Do something with the found league, if needed
      } else {
        this.showFoundLeagueCard = false;
        console.log('This league not exist')
      }

    } else {
      this.showFoundLeagueCard = false;
      // Handle case when the search term is empty
    }

  }



  //Filters by sport, gender and category

  filtersForm = new FormGroup({
    gender : new FormControl(''),
    sport : new FormControl(''),
    category : new FormControl(''),

  })

  public applyFilters(){

    // Get the selected values from the form
    const genderFilter = this.filtersForm.get('gender')!.value;
    const sportFilter = this.filtersForm.get('sport')!.value;
    const categoryFilter = this.filtersForm.get('category')!.value;

    // Apply filters to the original data
    this.filteredLeagues = this.leagues.filter(league => {
      return (
        (genderFilter === '' || league.gender === genderFilter) &&
        (sportFilter === '' || league.sport === sportFilter) &&
        (categoryFilter === '' || league.category === categoryFilter)
      );
    });

    console.log(this.filteredLeagues)
  }


  public resetFilters(){
    window.location.reload();
  }


}

