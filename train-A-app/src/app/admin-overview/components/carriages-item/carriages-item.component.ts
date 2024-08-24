import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { Carriage, CarriageDataForSchema } from 'app/admin-overview/models/carriages';
import { CarriageSchemaComponent } from 'app/shared/components/carriageSchema/carriageSchema.component';

@Component({
  selector: 'app-carriages-item',
  standalone: true,
  imports: [CommonModule, CarriageSchemaComponent, MatButtonModule, MatCard, MatCardTitle],
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
}
