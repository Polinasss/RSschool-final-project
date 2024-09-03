import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripStationsComponent } from './trip-stations.component';

describe('TripStationsComponent', () => {
  let component: TripStationsComponent;
  let fixture: ComponentFixture<TripStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripStationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TripStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
