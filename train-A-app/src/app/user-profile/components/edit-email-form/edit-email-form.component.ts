import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-email-form',
  standalone: true,
  imports: [
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './edit-email-form.component.html',
  styleUrl: './edit-email-form.component.scss',
})
export class EditEmailFormComponent {
  @Input() userEmailForm!: FormGroup;

  @Input() userEmail!: string;

  @Output() emailChanged = new EventEmitter<string>();

  isEditingEmail: boolean = false;

  get userEmailControl() {
    return this.userEmailForm.get('userEmail');
  }

  onEditEmail() {
    this.isEditingEmail = !this.isEditingEmail;
    this.userEmailForm.patchValue({ userEmail: this.userEmail });
  }

  onSubmit() {
    if (this.userEmailForm.valid) {
      const { userEmail } = this.userEmailForm.value;
      this.emailChanged.emit(userEmail);
      this.isEditingEmail = !this.isEditingEmail;
    }
  }
}
