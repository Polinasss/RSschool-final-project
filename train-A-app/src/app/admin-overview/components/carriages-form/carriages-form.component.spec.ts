import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriagesFormComponent } from './carriages-form.component';

describe('CarriagesFormComponent', () => {
  let component: CarriagesFormComponent;
  let fixture: ComponentFixture<CarriagesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriagesFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarriagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
