import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { StationFacade } from 'app/admin-overview/_state/station/station.facade';
import { Subject, takeUntil } from 'rxjs';
import { Station } from 'app/admin-overview/models/station';
import { UserProfileFacade } from 'app/user-profile/_state/user-profile.facade';
import { UserProfile } from 'app/user-profile/models/user-profile';
import { OrderItemComponent } from '../components/order-item/order-item.component';
import { Order } from '../models/order';

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
    OrderItemComponent,
  ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
})
export class OrderPageComponent implements OnInit, OnDestroy {
  private stationFacade = inject(StationFacade);

  private userProfileFacade = inject(UserProfileFacade);

  public stationList: Station[] = [];

  public user: UserProfile = { name: '', email: '', role: '' };

  public orderList: Order[] = [];

  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.stationFacade.loadStation();
    this.stationFacade.station$.pipe(takeUntil(this.destroy$)).subscribe((stations: Station[]) => {
      this.stationList = stations;
    });
    this.userProfileFacade.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
