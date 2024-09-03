import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Station } from 'app/admin-overview/models/station';
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

  cities: string[];

  constructor(
    public dialogRef: MatDialogRef<void>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      path: { stations: { city: string; id: number }[]; id: number };
      schedule: Segment[];
      allStations: Station[];
    },
  ) {
    console.log({ data });

    let arrivalTime = new Date(data.schedule[0].time[0]).getTime();
    this.durations = data.schedule.map((seg) => {
      const pause = formatDuration(new Date(seg.time[0]).getTime() - arrivalTime);
      arrivalTime = new Date(seg.time[1]).getTime();
      return pause;
    });
    this.cities = this.data.path.stations.map((st) => st.city);
    // this.cities = this.data.path.stations.map((id) => {
    //   return (
    //     this.data.allStations.find((st) => {
    //       return st.id === id;
    //     })?.city ?? 'err'
    //   );
    // });
  }

  // getCity(id: number) {
  //   return (
  //     this.data.allStations.find((st) => {
  //       return st.id === this.data.path.stations[id];
  //     })?.city ?? ''
  //   );
  // }

  onClose(): void {
    this.dialogRef.close();
  }
}
