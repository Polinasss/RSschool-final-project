import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { EditNameFormComponent } from '../../components/edit-name-form/edit-name-form.component';
import { EditEmailFormComponent } from '../../components/edit-email-form/edit-email-form.component';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    EditNameFormComponent,
    EditEmailFormComponent,
  ],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss',
})
export class UserProfilePageComponent {
  userName = 'My Name';

  userEmail = 'my@email.com';

  userNameForm: FormGroup;

  userEmailForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userNameForm = this.fb.group({
      userName: [this.userName, [Validators.required, Validators.minLength(3)]],
    });
    this.userEmailForm = this.fb.group({
      userEmail: [this.userEmail, [Validators.required, Validators.email]],
    });
  }

  onNameChanged(name: string) {
    this.userName = name;
  }

  onEmailChanged(email: string) {
    this.userEmail = email;
  }
}
