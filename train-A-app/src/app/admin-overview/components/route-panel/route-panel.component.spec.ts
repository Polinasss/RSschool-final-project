import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePanelComponent } from './route-panel.component';

describe('RoutePanelComponent', () => {
  let component: RoutePanelComponent;
  let fixture: ComponentFixture<RoutePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutePanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
