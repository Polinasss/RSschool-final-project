import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmailFormComponent } from './edit-email-form.component';

describe('EditEmailFormComponent', () => {
  let component: EditEmailFormComponent;
  let fixture: ComponentFixture<EditEmailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmailFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
