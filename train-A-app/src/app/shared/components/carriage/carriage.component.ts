import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Seat } from '../../types/seat';
import { SeatComponent } from '../seat/seat.component';

interface Carriage {
  code: string;
  name: string;
  rows: number;
  leftSeats: number;
  rightSeats: number;
}

@Component({
  selector: 'app-carriage',
  standalone: true,
  imports: [NgIf, NgFor, SeatComponent],
  templateUrl: './carriage.component.html',
  styleUrl: './carriage.component.scss',
})
export class CarriageComponent {
  @Input() public carriage!: Carriage;

  public seats: Seat[] = [];

  constructor() {
    if (this.carriage) {
      const { rows, leftSeats, rightSeats } = this.carriage;
      this.generateSeats(rows, leftSeats, rightSeats);
    }
  }

  generateSeats(rowsNumber: number, leftNumber: number, rightNumber: number) {
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
