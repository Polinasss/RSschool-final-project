import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-name-form',
  standalone: true,
  imports: [
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './edit-name-form.component.html',
  styleUrl: './edit-name-form.component.scss',
})
export class EditNameFormComponent {
  @Input() userNameForm!: FormGroup;

  @Input() userName!: string;

  @Output() nameChanged = new EventEmitter<string>();

  isEditingName: boolean = false;

  get userNameControl() {
    return this.userNameForm.get('userName');
  }

  onEditName() {
    this.isEditingName = !this.isEditingName;
  }

  onSubmit() {
    if (this.userNameForm.valid) {
      this.nameChanged.emit(this.userNameForm.value.userName);
      this.isEditingName = !this.isEditingName;
    }
  }
}
