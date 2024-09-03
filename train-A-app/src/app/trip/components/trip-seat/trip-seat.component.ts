import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Seat } from 'app/shared/models/seat';

@Component({
  selector: 'app-trip-seat',
  standalone: true,
  imports: [NgClass],
  templateUrl: './trip-seat.component.html',
  styleUrl: './trip-seat.component.scss',
})
export class TripSeatComponent {
  @Input() public seat!: Seat;

  @Input() public isDisabled: boolean = false;

  public toggleSelectedSeat() {
    if (this.seat.isAvailable) {
      this.seat.selected = !this.seat.selected;
    }
  }
}
