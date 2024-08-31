import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteDeleteComponent } from './route-delete.component';

describe('RouteDeleteComponent', () => {
  let component: RouteDeleteComponent;
  let fixture: ComponentFixture<RouteDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RouteDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
