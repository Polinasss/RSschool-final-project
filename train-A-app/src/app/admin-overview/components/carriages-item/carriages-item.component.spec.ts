import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriagesItemComponent } from './carriages-item.component';

describe('CarriagesItemComponent', () => {
  let component: CarriagesItemComponent;
  let fixture: ComponentFixture<CarriagesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriagesItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarriagesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
