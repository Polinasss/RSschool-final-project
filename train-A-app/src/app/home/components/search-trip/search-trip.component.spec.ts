import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTripComponent } from './search-trip.component';

describe('SearchTripComponent', () => {
  let component: SearchTripComponent;
  let fixture: ComponentFixture<SearchTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTripComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
