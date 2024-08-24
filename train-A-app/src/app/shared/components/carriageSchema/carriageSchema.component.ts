import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Seat } from '../../types/seat';
import { SeatComponent } from '../seat/seat.component';

export interface CarriageDataForSchema {
  name: string;
  rows: string;
  leftSeats: string;
  rightSeats: string;
}

@Component({
  selector: 'app-carriage-schema',
  standalone: true,
  imports: [NgIf, NgFor, SeatComponent],
  templateUrl: './CarriageSchema.component.html',
  styleUrl: './CarriageSchema.component.scss',
})
export class CarriageSchemaComponent {
  @Input() public carriage!: CarriageDataForSchema;

  public seats: Seat[] = [];

  constructor() {
    if (this.carriage) {
      const { rows, leftSeats, rightSeats } = this.carriage;
      this.generateSeats(Number(rows), Number(leftSeats), Number(rightSeats));
    }
  }

  private generateSeats(rowsNumber: number, leftNumber: number, rightNumber: number) {
    let seatNumber = 1;
    for (let row = 0; row < rowsNumber; row += 1) {
      for (let i = 0; i < leftNumber + rightNumber; i += 1) {
        const position = i <= leftNumber ? 'left' : 'right';
        this.seats.push({
          seatNumber,
          position,
          isAvailable: true,
          selected: false,
        });
        seatNumber += 1;
      }
    }
  }
}
