import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-league',
  standalone: true,
  imports: [],
  templateUrl: './delete-league.component.html',
  styleUrl: './delete-league.component.scss'
})
export class DeleteLeagueComponent {

  activeModal  = inject(NgbActiveModal);


}
