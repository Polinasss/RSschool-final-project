import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { Schedule } from 'app/home/models/trip';
import { formatDuration } from 'app/shared/utils/datetime';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { TripStationsComponent } from '../trip-stations/trip-stations.component';

@Component({
  selector: 'app-schedule-item',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCard,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatCardContent,
    MatDialogModule,
    DatePipe,
  ],
  templateUrl: './schedule-item.component.html',
  styleUrl: './schedule-item.component.scss',
})
export class ScheduleItemComponent implements OnInit {
  @Input() way!: Schedule;

  @Input() fromCity: string = '';

  @Input() toCity: string = '';

  @Input() path: { stations: number[]; id: number } = { stations: [], id: 0 };

  departureTime = '';

  arrivalTime = '';

  duration: string | number = '';

  durationDateTime: number = 0;

  carriagePrices: { type: string; price: number }[] = [];

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    // const dialogRef =
    this.dialog.open(TripStationsComponent, {
      width: '400px',
      data: { path: this.path, schedule: this.way.segments },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    //   console.log(result);
    // });
  }

  ngOnInit() {
    const segments = [...this.way.segments];
    const segmentsPrices = segments.map((seg) => seg.price);
    const carriageTypes = Object.keys(segmentsPrices[0]);
    this.carriagePrices = carriageTypes.map((type) => ({
      type,
      price: segmentsPrices.reduce((acc, cur) => acc + cur[type], 0),
    }));

    const [dt] = [...segments[0].time];
    this.departureTime = dt;
    const [, at] = segments[segments.length - 1].time;
    this.arrivalTime = at;
    const arrivalTimeStamp = new Date(this.departureTime).getTime();
    const departureTimeStamp = new Date(this.arrivalTime).getTime();

    this.durationDateTime = departureTimeStamp - arrivalTimeStamp;
    this.duration = formatDuration(this.durationDateTime);
  }
}
