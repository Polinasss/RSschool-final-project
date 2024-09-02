import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../models/order';
import { mockOrders } from '../models/mocked-data';

export interface Users {
  id: number;
  email: string;
  name: string;
  role: string;
}

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
  ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
})
export class OrderPageComponent {
  orders: Order[] = mockOrders;

  getTime(timeString: string): Date {
    return new Date(timeString);
  }

  public calculateDuration(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = Math.abs(end.getTime() - start.getTime());
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} h ${minutes} m`;
  }

  public getPrice(order: Order): number {
    const priceObject = order.schedule.segments[0].price;
    return Object.values(priceObject)[0];
  }

  public onCancelOrder(): void {
    console.log('The order canceled!');
  }
}
