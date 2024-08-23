import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriagesPanelComponent } from './carriages-panel.component';

describe('CarriagesPanelComponent', () => {
  let component: CarriagesPanelComponent;
  let fixture: ComponentFixture<CarriagesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriagesPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarriagesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
