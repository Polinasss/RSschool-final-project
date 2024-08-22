import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriageComponent } from './carriage.component';

describe('CarriageComponent', () => {
  let component: CarriageComponent;
  let fixture: ComponentFixture<CarriageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarriageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
