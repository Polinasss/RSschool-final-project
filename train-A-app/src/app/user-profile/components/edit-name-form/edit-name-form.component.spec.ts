import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNameFormComponent } from './edit-name-form.component';

describe('EditNameFormComponent', () => {
  let component: EditNameFormComponent;
  let fixture: ComponentFixture<EditNameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNameFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditNameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
