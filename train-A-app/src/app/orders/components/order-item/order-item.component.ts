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
import { Order, Segment } from 'app/orders/models/order';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { UserProfile } from 'app/user-profile/models/user-profile';
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

  @Input() user!: UserProfile;

  readonly dialog = inject(MatDialog);

  private destroy$: Subject<void> = new Subject<void>();

  public orders$ = new BehaviorSubject<Order[]>(mockOrders);

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

  private filterRoute(path: number[], startStation: number, endStation: number): number[] {
    const startIndex = path.indexOf(startStation);
    const endIndex = path.indexOf(endStation);

    return path.slice(startIndex, endIndex + 1);
  }

  private filterSegments(segments: Segment[], startIndex: number, endIndex: number): Segment[] {
    return segments.slice(startIndex, endIndex);
  }

  public getTripDetails(order: Order, startStation: number, endStation: number) {
    const startIndex = order.path.indexOf(startStation);
    const endIndex = order.path.indexOf(endStation);

    const filteredPath = this.filterRoute(order.path, startStation, endStation);
    const filteredSegments = this.filterSegments(order.schedule.segments, startIndex, endIndex);

    const startTime = new Date(filteredSegments[0].time[0]);
    const endTime = new Date(filteredSegments[filteredSegments.length - 1].time[1]);

    return {
      filteredPath,
      filteredSegments,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      duration: this.calculateDuration(startTime.toISOString(), endTime.toISOString()),
    };
  }

  public calculateTotalPrice(segments: Segment[]): number {
    return segments.reduce((total, segment) => {
      const totalPrice = segment.price;
      return total + Object.values(totalPrice)[0];
    }, 0);
  }

  public onCancelOrder(orderId: number): void {
    const dialogRef = this.dialog.open(CancelDialogComponent, {
      data: { orderId, user: this.user },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          const updatedOrders = this.orders$.getValue().map((order) => {
            if (order.id === orderId) {
              return { ...order, status: 'cancelled' };
            }
            return order;
          });
          this.orders$.next(updatedOrders);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
