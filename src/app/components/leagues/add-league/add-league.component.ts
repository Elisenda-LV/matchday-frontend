import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { League } from '../../../interfaces/league.interface';
import { LeagueService } from '../../../services/leagues.service';



@Component({
  selector: 'app-add-league',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-league.component.html',
  styleUrl: './add-league.component.scss'
})


export class AddLeagueComponent {

  activeModal  = inject(NgbActiveModal);

  @Input() league: League[] = [];

  //TODO: ampliar form amb dades extra:

  leagueForm = new FormGroup({
    name: new FormControl ('', [Validators.required, Validators.maxLength(15)]),
    sport: new FormControl ('', [Validators.required]),
    category: new FormControl ('', [Validators.required]),
    location: new FormControl ('', [Validators.required, Validators.maxLength(15)]),
    description: new FormGroup ('', [Validators.required, Validators.maxLength(140)]),

  });

  constructor(public leagueService: LeagueService){}


  createLeague(){
    if(this.leagueForm.valid){

      const formValues = this.leagueForm.value;
      const newLeague: any = {
        name: formValues.name!,
        sport: formValues.sport!,
        category: formValues.category!,
        location: formValues.location!,
        description: formValues.description!,

      }

      this.leagueService.addLeague(newLeague).subscribe(
        {
          next: (createdLeague: any) => {
            this.activeModal.close(createdLeague);

          },
          error: (err) => console.log(err)
        }
      )
    }
  }

  closeLeague(){
    this.activeModal.close(this.createLeague)
  }



}
