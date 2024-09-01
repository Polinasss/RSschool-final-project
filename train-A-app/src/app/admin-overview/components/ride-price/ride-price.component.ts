import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Price } from 'app/admin-overview/models/ride';

@Component({
  selector: 'app-ride-price',
  standalone: true,
  imports: [NgIf, NgFor, MatIcon, CurrencyPipe],
  templateUrl: './ride-price.component.html',
  styleUrl: './ride-price.component.scss',
})
export class RidePriceComponent {
  @Input() price!: Price;

  @Input() i!: number;

  @Input() length!: number;

  public editPriceIndex: number | null = null;

  public getKeys(obj: object): Array<string> {
    return Object.keys(obj);
  }

  public getValue(obj: { [key: string]: number }, key: string): number | undefined {
    return obj[key];
  }

  public onUpdatePrice(index: number) {
    this.editPriceIndex = index;
  }

  public onSavePrice() {
    this.editPriceIndex = null;
  }
}
