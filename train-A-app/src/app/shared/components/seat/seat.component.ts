import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Seat } from '../../types/seat';

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
