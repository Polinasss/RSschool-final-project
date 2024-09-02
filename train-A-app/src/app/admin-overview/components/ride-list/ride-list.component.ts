import { Component, inject, Input, OnInit } from '@angular/core';
import { RideFacade } from 'app/admin-overview/_state/ride/ride.facade';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RideItemComponent } from '../ride-item/ride-item.component';

@Component({
  selector: 'app-ride-list',
  standalone: true,
  imports: [RideItemComponent, NgIf, AsyncPipe, MatProgressSpinnerModule, NgTemplateOutlet],
  templateUrl: './ride-list.component.html',
  styleUrl: './ride-list.component.scss',
})
export class RideListComponent implements OnInit {
  @Input() id!: string | null;

  private rideFacade = inject(RideFacade);

  public ride$ = this.rideFacade.ride$;

  public isLoading$ = this.rideFacade.isLoading$;

  public error$ = this.rideFacade.error$;

  ngOnInit(): void {
    this.rideFacade.loadRideById(Number(this.id));
  }
}
