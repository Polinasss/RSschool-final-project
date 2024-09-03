import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './cancel-dialog.component.html',
  styleUrl: './cancel-dialog.component.scss',
})
export class CancelDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CancelDialogComponent>);

  onClickNo(): void {
    this.dialogRef.close();
  }
}
