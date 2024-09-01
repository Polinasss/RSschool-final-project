import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserProfilePasswordBody } from 'app/user-profile/models/user-profile';

@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss',
})
export class ChangePasswordDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ChangePasswordDialogComponent>);

  private data = inject<UserProfilePasswordBody>(MAT_DIALOG_DATA);

  public newPassword = '';

  onSaveNewPassword() {
    this.newPassword = this.data.password;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
