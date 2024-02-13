import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueFiltersComponent } from './league-filters.component';

describe('LeagueFiltersComponent', () => {
  let component: LeagueFiltersComponent;
  let fixture: ComponentFixture<LeagueFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeagueFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
