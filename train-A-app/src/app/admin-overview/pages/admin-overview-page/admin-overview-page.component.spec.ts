import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOverviewPageComponent } from './admin-overview-page.component';

describe('AdminOverviewPageComponent', () => {
  let component: AdminOverviewPageComponent;
  let fixture: ComponentFixture<AdminOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOverviewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
