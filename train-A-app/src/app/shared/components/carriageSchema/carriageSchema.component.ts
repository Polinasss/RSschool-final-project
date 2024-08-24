import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CarriageDataForSchema } from 'app/admin-overview/models/carriages';
import { Seat } from '../../models/seat';
import { SeatComponent } from '../seat/seat.component';

@Component({
  selector: 'app-carriage-schema',
  standalone: true,
  imports: [NgIf, NgFor, SeatComponent],
  templateUrl: './carriageSchema.component.html',
  styleUrl: './carriageSchema.component.scss',
})
export class CarriageSchemaComponent implements OnInit {
  @Input() public carriage!: CarriageDataForSchema;

  @Input() public isDisabled: boolean = false;

  public leftSeats: Seat[] = [];

  public rightSeats: Seat[] = [];

  public leftSeatsInRows: Seat[][] = [];

  public rightSeatsInRows: Seat[][] = [];

  public numberOfRows: number = 0;

  public ngOnInit() {
    if (this.carriage) {
      const { rows, leftSeats, rightSeats } = this.carriage;
      this.numberOfRows = Number(rows);
      this.generateSeats(this.numberOfRows, Number(leftSeats), Number(rightSeats));
      this.leftSeatsInRows = this.distributeSeats(this.leftSeats, Number(leftSeats));
      this.rightSeatsInRows = this.distributeSeats(this.rightSeats, Number(rightSeats));
    }
  }

  private generateSeats(rowsNumber: number, leftNumber: number, rightNumber: number) {
    let seatNumber = 1;
    for (let row = 0; row < rowsNumber; row += 1) {
      for (let i = 0; i < leftNumber + rightNumber; i += 1) {
        if (i < leftNumber) {
          this.leftSeats.push({
            seatNumber,
            position: 'left',
            isAvailable: true,
            selected: false,
          });
        } else {
          this.rightSeats.push({
            seatNumber,
            position: 'right',
            isAvailable: true,
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
