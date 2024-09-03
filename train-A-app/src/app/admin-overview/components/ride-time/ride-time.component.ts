import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RideFacade } from 'app/admin-overview/_state/ride/ride.facade';
import { Ride, Segment } from 'app/admin-overview/models/ride';

@Component({
  selector: 'app-ride-time',
  standalone: true,
  imports: [MatIcon, NgIf, DatePipe, ReactiveFormsModule],
  templateUrl: './ride-time.component.html',
  styleUrl: './ride-time.component.scss',
})
export class RideTimeComponent implements OnInit {
  @Input() time!: [string, string];

  @Input() i!: number;

  @Input() length!: number;

  @Input() ride!: Ride;

  @Input() rideId!: number;

  public editTimeIndex: number | null = null;

  public departureTime!: string;

  public arrivalTime!: string;

  public timeForm!: FormGroup;

  private rideFacade = inject(RideFacade);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.timeForm = this.fb.group({
      arrivalTime: [null, Validators.required],
      departureTime: [null, Validators.required],
    });
    if (this.time) {
      [this.arrivalTime, this.departureTime] = this.time as [string, string];
      this.initializeFormValues(this.arrivalTime, this.departureTime);
    }
  }

  private initializeFormValues(arrivalTime: string, departureTime: string) {
    if (this.i !== null) {
      this.timeForm.patchValue({
        arrivalTime: this.getTime(arrivalTime),
        departureTime: this.getTime(departureTime),
      });
    }
  }

  private getTime(timeString: string): string | null {
    if (timeString) {
      const date = new Date(timeString);
      return date.toISOString().slice(0, 16);
    }
    return null;
  }

  public onUpdateTime(index: number) {
    this.editTimeIndex = index;
    this.initializeFormValues(this.arrivalTime, this.departureTime);
  }

  public onSaveTime() {
    if (this.timeForm.valid) {
      const { arrivalTime, departureTime } = this.timeForm.value;
      this.editTimeIndex = null;
      const scheduleForUpdate = this.ride.schedule.find(
        (schedule) => schedule.rideId === this.rideId,
      );
      const segmentForUpdate = scheduleForUpdate?.segments[this.i];

      const updatedSegment = {
        ...segmentForUpdate,
        time: [new Date(arrivalTime).toISOString(), new Date(departureTime).toISOString()],
      } as Segment;

      const updatedSchedule = {
        ...scheduleForUpdate,
        segments: scheduleForUpdate?.segments.map((segment, index) =>
          index === this.i ? updatedSegment : segment,
        ),
      };
      const newRide: Segment[] | undefined = updatedSchedule.segments;
      if (newRide) {
        this.rideFacade.updateRide(Number(this.ride.id), Number(this.rideId), newRide);
      }
    }
  }
}
