import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Ride } from 'app/admin-overview/models/ride';
import { RideTimeComponent } from '../ride-time/ride-time.component';
import { RidePriceComponent } from '../ride-price/ride-price.component';

@Component({
  selector: 'app-ride-item',
  standalone: true,
  imports: [NgFor, NgIf, RideTimeComponent, RidePriceComponent],
  templateUrl: './ride-item.component.html',
  styleUrl: './ride-item.component.scss',
})
export class RideItemComponent {
  @Input() ride: Ride | null = null;
}
