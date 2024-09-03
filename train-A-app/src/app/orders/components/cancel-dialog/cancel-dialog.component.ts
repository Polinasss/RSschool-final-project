import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserProfile } from 'app/user-profile/models/user-profile';

@Component({
  selector: 'app-cancel-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './cancel-dialog.component.html',
  styleUrl: './cancel-dialog.component.scss',
})
export class CancelDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CancelDialogComponent>);

  public data = inject<{ orderId: number; user: UserProfile }>(MAT_DIALOG_DATA);

  onClickYes(): void {
    this.dialogRef.close(true);
  }

  onClickNo(): void {
    this.dialogRef.close(false);
  }
}
