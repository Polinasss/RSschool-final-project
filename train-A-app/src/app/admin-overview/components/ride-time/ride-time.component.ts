import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RideFacade } from 'app/admin-overview/_state/ride/ride.facade';
import { Ride, Segment } from 'app/admin-overview/models/ride';
import { NotificationService } from 'app/core/services/notification/notification.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ride-time',
  standalone: true,
  imports: [MatIcon, NgIf, DatePipe, ReactiveFormsModule],
  templateUrl: './ride-time.component.html',
  styleUrl: './ride-time.component.scss',
})
export class RideTimeComponent implements OnInit, OnDestroy {
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

  public error$ = this.rideFacade.error$;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.timeForm = this.fb.group({
      arrivalTime: [null, Validators.required],
      departureTime: [null, Validators.required],
    });
    if (this.time) {
      [this.arrivalTime, this.departureTime] = this.time as [string, string];
      this.initializeFormValues(this.arrivalTime, this.departureTime);
    }

    this.error$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      if (error) {
        this.notificationService.openFailureSnackBar('Time sequence is wrong');
      }
    });
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

  private getDifferenceBetweenTimezones(localDate: Date) {
    const timezoneOffsetInMilliseconds = -localDate.getTimezoneOffset() * 60 * 1000;
    return timezoneOffsetInMilliseconds;
  }

  public onSaveTime() {
    if (this.timeForm.valid) {
      const { arrivalTime, departureTime } = this.timeForm.value;
      const arrivalDate = new Date(arrivalTime);
      const departureDate = new Date(departureTime);
      const timezoneOffset = this.getDifferenceBetweenTimezones(arrivalDate);
      const adjustedArrivalDate = new Date(arrivalDate.getTime() + timezoneOffset);
      const adjustedDepartureDate = new Date(departureDate.getTime() + timezoneOffset);
      const scheduleForUpdate = this.ride.schedule.find(
        (schedule) => schedule.rideId === this.rideId,
      );

      if (!scheduleForUpdate) {
        this.notificationService.openFailureSnackBar('Schedule not found');
        return;
      }

      const segmentForUpdate = scheduleForUpdate.segments[this.i];
      const previousSegment = this.i > 0 ? scheduleForUpdate.segments[this.i - 1] : null;
      const nextSegment =
        this.i < scheduleForUpdate.segments.length - 1
          ? scheduleForUpdate.segments[this.i + 1]
          : null;

      const isValidTime =
        arrivalDate < departureDate &&
        (!previousSegment || adjustedArrivalDate > new Date(previousSegment.time[1])) &&
        (!nextSegment || adjustedDepartureDate < new Date(nextSegment.time[0]));

      if (isValidTime) {
        this.editTimeIndex = null;
        const updatedSegment = {
          ...segmentForUpdate,
          time: [adjustedArrivalDate.toISOString(), adjustedDepartureDate.toISOString()],
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
      } else {
        this.notificationService.openFailureSnackBar(
          'Time sequence is wrong. If it is the first and last station, then the train is already occupied. If intercity, check with the schedule of neighboring stations',
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
