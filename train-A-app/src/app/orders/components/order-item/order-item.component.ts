import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Station } from 'app/admin-overview/models/station';
import { mockOrders } from 'app/orders/models/mocked-data';
import { Order } from 'app/orders/models/order';
import { Subject } from 'rxjs';
import { CancelDialogComponent } from '../cancel-dialog/cancel-dialog.component';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
  ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent implements OnDestroy {
  @Input() stations!: Station[];

  public stationList: Station[] = [];

  readonly dialog = inject(MatDialog);

  orders: Order[] = mockOrders;

  private destroy$: Subject<void> = new Subject<void>();

  public getTime(timeString: string): Date {
    return new Date(timeString);
  }

  public getCityNameById(id: number): string {
    const station = this.stations.find((stationEl) => stationEl.id === id);
    return station ? station.city : 'Unknown City';
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
    const dialogRef = this.dialog.open(CancelDialogComponent, {});

    dialogRef.afterClosed().subscribe(() => {
      console.log('The order canceled!');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
