import { DatePipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Time } from 'app/admin-overview/models/ride';

@Component({
  selector: 'app-ride-time',
  standalone: true,
  imports: [MatIcon, NgIf, DatePipe],
  templateUrl: './ride-time.component.html',
  styleUrl: './ride-time.component.scss',
})
export class RideTimeComponent implements OnInit {
  @Input() time: Time = { time: ['', ''] };

  @Input() i!: number;

  @Input() length!: number;

  public editTimeIndex: number | null = null;

  public departureTime!: string;

  public arrivalTime!: string;

  ngOnInit() {
    if (this.time && this.time.time) {
      [this.departureTime, this.arrivalTime] = [this.time.time[0], this.time.time[1]];
    }
  }

  public onUpdateTime(index: number) {
    this.editTimeIndex = index;
  }

  public onSaveTime() {
    this.editTimeIndex = null;
  }
}