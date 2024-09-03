import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StationFacade } from 'app/admin-overview/_state/station/station.facade';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from 'app/core/services/notification/notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StationMapComponent } from '../../components/station-map/station-map.component';
import { StationFormComponent } from '../../components/station-form/station-form.component';
import { StationListComponent } from '../../components/station-list/station-list.component';
import { LocationData, Station, StationBody } from '../../models/station';

@Component({
  selector: 'app-stations-page',
  standalone: true,
  imports: [
    StationMapComponent,
    StationFormComponent,
    StationListComponent,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule,
  ],
  templateUrl: './stations-page.component.html',
  styleUrl: './stations-page.component.scss',
})
export class StationsPageComponent implements OnInit, OnDestroy {
  stationsConnectedForm: FormGroup;

  public selectedLocation: LocationData | null = null;

  private stationFacade = inject(StationFacade);

  readonly stations$ = this.stationFacade.station$;

  readonly error$ = this.stationFacade.error$;

  readonly isLoading$ = this.stationFacade.isLoading$;

  public stationList: Station[] = [];

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
  ) {
    this.stationsConnectedForm = this.fb.group({
      city: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      connectedTo: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.error$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      if (error) {
        this.notificationService.openFailureSnackBar(error);
      }
    });
    this.stations$.pipe(takeUntil(this.destroy$)).subscribe((stations: Station[]) => {
      this.stationList = stations;
    });
  }

  public onLocationSelected(locationData: LocationData): void {
    this.selectedLocation = locationData;
    this.stationsConnectedForm.patchValue({
      city: locationData.city,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    });
  }

  public onAddStation(newStation: StationBody) {
    const stationExists = this.stationList.find((station) => station.city === newStation.city);

    const connectedTo = this.stationsConnectedForm.get('connectedTo')?.value;
    const uniqueConnectedTo = new Set(connectedTo.map((stationId: number) => stationId));

    if (stationExists) {
      const message = 'Maximum 1 station can be in one city!';
      this.notificationService.openFailureSnackBar(message);
    } else if (uniqueConnectedTo.size !== connectedTo.length) {
      const message = 'Duplicate stations selected in "Connected"!';
      this.notificationService.openFailureSnackBar(message);
    } else {
      this.stationFacade.addStation(newStation);
    }
  }

  public onDeleteStation(stationId: number) {
    this.stationFacade.deleteStation(stationId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
