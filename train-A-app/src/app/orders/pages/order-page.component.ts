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
import { OrderItemComponent } from '../components/order-item/order-item.component';
import { UserFacade } from '../_state/user/user.facade';
import { User } from '../models/user';

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

  private userFacade = inject(UserFacade);

  public stationList: Station[] = [];

  public userList: User[] = [];

  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.stationFacade.loadStation();
    this.stationFacade.station$.pipe(takeUntil(this.destroy$)).subscribe((stations: Station[]) => {
      this.stationList = stations;
    });
    this.userFacade.loadUser();
    this.userFacade.user$.pipe(takeUntil(this.destroy$)).subscribe((user: User[]) => {
      this.userList = user;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
