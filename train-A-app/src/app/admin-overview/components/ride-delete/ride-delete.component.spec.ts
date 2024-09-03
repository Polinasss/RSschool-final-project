import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideDeleteComponent } from './ride-delete.component';

describe('RideDeleteComponent', () => {
  let component: RideDeleteComponent;
  let fixture: ComponentFixture<RideDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RideDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
