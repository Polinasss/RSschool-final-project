import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleItemComponent } from './schedule-item.component';

describe('ScheduleItemComponent', () => {
  let component: ScheduleItemComponent;
  let fixture: ComponentFixture<ScheduleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
