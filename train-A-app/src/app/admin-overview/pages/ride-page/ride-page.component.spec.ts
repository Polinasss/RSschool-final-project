import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidePageComponent } from './ride-page.component';

describe('RidePageComponent', () => {
  let component: RidePageComponent;
  let fixture: ComponentFixture<RidePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
