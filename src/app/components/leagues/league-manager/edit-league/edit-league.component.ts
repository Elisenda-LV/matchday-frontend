import { Component, Input, inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { League } from '../../../../interfaces/league.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeagueService } from '../../../../services/leagues.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-league',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-league.component.html',
  styleUrl: './edit-league.component.scss'
})


export class EditLeagueComponent implements OnInit {

  activeModal  = inject(NgbActiveModal);

  @Input() leagueId : number = 0;
  //@Input() league: League | undefined;

  editLeagueForm: FormGroup;

  constructor(public leagueService: LeagueService,  public route: ActivatedRoute){

    this.editLeagueForm = new FormGroup({
      league_name: new FormControl ('', [Validators.required, Validators.maxLength(15)]),
      sport_id: new FormControl ('', [Validators.required]),
      gender: new FormControl ('', [Validators.required]),
      category: new FormControl ('', [Validators.required]),
      location: new FormControl ('', [Validators.required, Validators.maxLength(15)]),
      description: new FormControl ('', [Validators.required, Validators.maxLength(140)]),

    })
  }

  ngOnInit(){
    if (this.leagueId) {

      this.leagueService.getLeagueById(this.leagueId).subscribe((leagueDetails) => {
        console.log('league id:',this.leagueId)
        console.log('details', leagueDetails)

        this.editLeagueForm.patchValue({
          league_name: leagueDetails.league_name,
          sport_id: leagueDetails.sport_id,
          gender: leagueDetails.gender,
          category: leagueDetails.category,
          location: leagueDetails.location,
          description: leagueDetails.description,
        });


      });
    }
  }


  // Update league modal:

  public editLeague(){
    if(this.editLeagueForm.valid){
      const formValues = this.editLeagueForm.value;
      const updateLeague: any = {
        id_league: this.leagueId!,
        league_name: formValues.league_name!,
        sport_id: formValues.sport_id!,
        gender: formValues.gender!,
        category: formValues.category!,
        location: formValues.location!,
        description: formValues.description!,
      }

      this.leagueService.updateLeague(updateLeague).subscribe( {
          next: () => {
            this.activeModal.close(this.editLeague);
          },
          error: (err) => console.log(err)
        }
      );

    }
  }

  public closeEditLeague(){
    this.activeModal.close(this.editLeague)
  }

}


