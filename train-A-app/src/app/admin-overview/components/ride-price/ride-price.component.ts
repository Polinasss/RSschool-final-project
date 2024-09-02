import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CarriageFacade } from 'app/admin-overview/_state/carriage/carriage.facade';
import { Price } from 'app/admin-overview/models/ride';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-ride-price',
  standalone: true,
  imports: [NgIf, NgFor, MatIcon, CurrencyPipe, AsyncPipe, ReactiveFormsModule],
  templateUrl: './ride-price.component.html',
  styleUrl: './ride-price.component.scss',
})
export class RidePriceComponent implements OnInit {
  @Input() price!: Price;

  @Input() i!: number;

  @Input() length!: number;

  public editPriceIndex: number | null = null;

  private carriageFacade = inject(CarriageFacade);

  private carriage$ = this.carriageFacade.carriage$;

  public carriageNames$!: Observable<string[]>;

  public priceForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.carriageNames$ = this.carriage$.pipe(
      map((carriages) => {
        return Object.keys(this.price)
          .reduce((names, key) => {
            const carriageName = carriages.find((carriage) => carriage.code === key);
            if (carriageName) names.push(carriageName.name);
            return names;
          }, [] as string[])
          .sort();
      }),
    );
    this.initializeForm();
  }

  private initializeForm(): void {
    const controls: { [key: string]: FormControl } = {};
    Object.keys(this.price).forEach((key) => {
      controls[key] = new FormControl(this.getValue(this.price, key));
    });
    this.priceForm = this.fb.group(controls);
  }

  public getValue(obj: { [key: string]: number }, key: string): number {
    return obj[key];
  }

  public onUpdatePrice(index: number) {
    this.editPriceIndex = index;
  }

  public onSavePrice() {
    if (this.priceForm.valid) {
      this.editPriceIndex = null;
    }
  }
}