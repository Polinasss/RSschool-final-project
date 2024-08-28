import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriageSchemaComponent } from './carriage-schema.component';

describe('CarriageSchemaComponent', () => {
  let component: CarriageSchemaComponent;
  let fixture: ComponentFixture<CarriageSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriageSchemaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarriageSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
