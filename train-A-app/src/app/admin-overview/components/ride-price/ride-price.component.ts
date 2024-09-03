import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CarriageFacade } from 'app/admin-overview/_state/carriage/carriage.facade';
import { RideFacade } from 'app/admin-overview/_state/ride/ride.facade';
import { Price, Ride, Segment } from 'app/admin-overview/models/ride';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-ride-price',
  standalone: true,
  imports: [NgIf, NgFor, MatIcon, CurrencyPipe, AsyncPipe, ReactiveFormsModule],
  templateUrl: './ride-price.component.html',
  styleUrl: './ride-price.component.scss',
})
export class RidePriceComponent implements OnInit {
  @Input() price!: Price;

  @Input() i!: number;

  @Input() length!: number;

  @Input() ride!: Ride;

  @Input() rideId!: number;

  public editPriceIndex: number | null = null;

  private carriageFacade = inject(CarriageFacade);

  private carriage$ = this.carriageFacade.carriage$;

  public carriageNames$!: Observable<string[]>;

  private rideFacade = inject(RideFacade);

  public priceForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.carriageNames$ = this.carriage$.pipe(
      map((carriages) => {
        return Object.keys(this.price)
          .reduce((names, key) => {
            const carriageName = carriages.find((carriage) => carriage.code === key);
            if (carriageName) names.push(carriageName.name);
            return names;
          }, [] as string[])
          .sort();
      }),
    );
    this.initializeForm();
  }

  private initializeForm(): void {
    const controls: { [key: string]: FormControl } = {};
    Object.keys(this.price).forEach((key) => {
      controls[key] = new FormControl(this.getValue(this.price, key));
    });
    this.priceForm = this.fb.group(controls);
  }

  public getValue(obj: { [key: string]: number }, key: string): number {
    return obj[key];
  }

  public onUpdatePrice(index: number) {
    this.editPriceIndex = index;
  }

  public onSavePrice() {
    if (this.priceForm.valid) {
      this.editPriceIndex = null;
      const formValues = this.priceForm.value;
      const updatedPrice: Price = Object.keys(formValues).reduce((acc, key) => {
        acc[key] = formValues[key];
        return acc;
      }, {} as Price);

      const scheduleForUpdate = this.ride.schedule.find(
        (schedule) => schedule.rideId === this.rideId,
      );
      const segmentForUpdate = scheduleForUpdate?.segments[this.i];

      const updatedSegment = {
        ...segmentForUpdate,
        price: updatedPrice,
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
