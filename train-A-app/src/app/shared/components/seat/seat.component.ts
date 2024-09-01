import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Seat } from '../../models/seat';

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [NgClass],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.scss',
})
export class SeatComponent {
  @Input() public seat!: Seat;

  @Input() public isDisabled: boolean = false;

  public toggleSelectedSeat() {
    if (this.seat.isAvailable) {
      this.seat.selected = !this.seat.selected;
    }
  }
}
