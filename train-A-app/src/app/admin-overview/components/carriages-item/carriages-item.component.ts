import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { Carriage, CarriageDataForSchema } from 'app/admin-overview/models/carriage';
import { CarriageSchemaComponent } from 'app/shared/components/carriage-schema/carriage-schema.component';

@Component({
  selector: 'app-carriages-item',
  standalone: true,
  imports: [
    CommonModule,
    CarriageSchemaComponent,
    MatCard,
    MatCardTitle,
    MatIcon,
    MatGridListModule,
  ],
  templateUrl: './carriages-item.component.html',
  styleUrl: './carriages-item.component.scss',
})
export class CarriagesItemComponent implements OnInit {
  @Input() item!: Carriage;

  public carriageData!: CarriageDataForSchema;

  public ngOnInit(): void {
    if (this.item) {
      this.carriageData = {
        name: this.item.name,
        rows: String(this.item.rows),
        leftSeats: String(this.item.leftSeats),
        rightSeats: String(this.item.rightSeats),
      };
    }
  }

  public onUpdate(): void {}
}
