import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Seat {
  seatNumber: number;
  position: 'left' | 'right';
  isAvailable: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [NgClass],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.scss',
})
export class SeatComponent {
  @Input() public seat!: Seat;

  public toggleSelectedSeat() {
    if (this.seat.isAvailable) {
      this.seat.selected = !this.seat.selected;
    }
  }
}
