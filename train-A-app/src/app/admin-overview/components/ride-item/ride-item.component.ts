import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Ride } from 'app/admin-overview/models/ride';

@Component({
  selector: 'app-ride-item',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './ride-item.component.html',
  styleUrl: './ride-item.component.scss',
})
export class RideItemComponent {
  @Input() ride: Ride | null = null;

  public getKeys(obj: object): Array<string> {
    return Object.keys(obj);
  }

  public getValue(obj: { [key: string]: number }, key: string): number | undefined {
    return obj[key];
  }
}
