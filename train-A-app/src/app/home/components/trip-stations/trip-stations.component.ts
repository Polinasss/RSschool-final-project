import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Segment } from 'app/home/models/trip';
import { formatDuration } from 'app/shared/utils/datetime';

@Component({
  selector: 'app-trip-stations',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, DatePipe],
  templateUrl: './trip-stations.component.html',
  styleUrl: './trip-stations.component.scss',
})
export class TripStationsComponent {
  durations: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<void>,
    @Inject(MAT_DIALOG_DATA)
    public data: { path: { stations: number[]; id: number }; schedule: Segment[] },
  ) {
    this.durations = data.schedule.map((seg) =>
      formatDuration(new Date(seg.time[1]).getTime() - new Date(seg.time[0]).getTime()),
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
