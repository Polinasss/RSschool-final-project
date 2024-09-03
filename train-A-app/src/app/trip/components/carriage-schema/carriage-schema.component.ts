import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CarriageDataForSchema } from 'app/admin-overview/models/carriage';
import { Seat } from 'app/shared/models/seat';
import { NgFor, NgIf } from '@angular/common';
import { TripSeatComponent } from '../trip-seat/trip-seat.component';

@Component({
  selector: 'app-carriage-schema',
  standalone: true,
  imports: [TripSeatComponent, NgFor, NgIf],
  templateUrl: './carriage-schema.component.html',
  styleUrl: './carriage-schema.component.scss',
})
export class CarriageSchemaComponent implements OnChanges {
  @Input() public carriage!: CarriageDataForSchema;

  @Input() public isDisabled: boolean = false;

  public leftSeats: Seat[] = [];

  public rightSeats: Seat[] = [];

  public leftSeatsInRows: Seat[][] = [];

  public rightSeatsInRows: Seat[][] = [];

  public numberOfRows: number = 0;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['carriage'] && this.carriage) {
      this.initializeSeats();
    }
  }

  private initializeSeats() {
    const { rows, leftSeats, rightSeats } = this.carriage;
    this.numberOfRows = Number(rows);
    this.leftSeats = [];
    this.rightSeats = [];
    this.generateSeats(this.numberOfRows, Number(leftSeats), Number(rightSeats));
    this.leftSeatsInRows = this.distributeSeats(this.leftSeats, Number(leftSeats));
    this.rightSeatsInRows = this.distributeSeats(this.rightSeats, Number(rightSeats));
  }

  private generateSeats(
    rowsNumber: number,
    leftNumber: number,
    rightNumber: number,
    isAvailable: boolean = true,
  ) {
    let seatNumber = 1;
    for (let row = 0; row < rowsNumber; row += 1) {
      for (let i = 0; i < leftNumber + rightNumber; i += 1) {
        if (i < leftNumber) {
          this.leftSeats.push({
            seatNumber,
            position: 'left',
            isAvailable: false,
            selected: false,
          });
        } else {
          this.rightSeats.push({
            seatNumber,
            position: 'right',
            isAvailable,
            selected: false,
          });
        }
        seatNumber += 1;
      }
    }
  }

  private distributeSeats(seats: Seat[], seatsPerRow: number): Seat[][] {
    const columns = [];
    for (let i = 0; i < seats.length; i += seatsPerRow) {
      const column = seats.slice(i, i + seatsPerRow);
      columns.push(column.reverse());
    }
    return columns;
  }
}
