import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-league-filters',
  standalone: true,
  imports: [],
  templateUrl: './league-filters.component.html',
  styleUrl: './league-filters.component.scss'
})


export class LeagueFiltersComponent {

  @Output() filtersApplied = new EventEmitter<{ gender?: string, category?: string, sport?: string }>();
  @Output() filtersReset = new EventEmitter<void>();

   // Values from DOM selector:
   @ViewChild('sportSelect') sportSelect!: ElementRef;
   @ViewChild('genderSelect') genderSelect!: ElementRef;
   @ViewChild('categorySelect') categorySelect!: ElementRef;


  applyFilters() {
    const selectedFilters = {
      gender: this.genderSelect.nativeElement.value !== '' ? this.genderSelect.nativeElement.value : null,
      category: this.categorySelect.nativeElement.value !== '' ? this.categorySelect.nativeElement.value : null,
      sport: this.sportSelect.nativeElement.value !== '' ? this.sportSelect.nativeElement.value : null,

    };

    this.filtersApplied.emit(selectedFilters);

  }


  resetFilters() {
    this.filtersReset.emit();

  }

}
