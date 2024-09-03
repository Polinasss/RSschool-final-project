import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, startWith, map, Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { SearchParams, SearchService } from 'app/home/services/search.service';
import { TripFacade } from 'app/home/_state/search.facade';
import { StationFacade } from 'app/admin-overview/_state/station/station.facade';
import { Station } from 'app/admin-overview/models/station';
import { NotificationService } from 'app/core/services/notification/notification.service';

@Component({
  selector: 'app-search-trip',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-trip.component.html',
  styleUrl: './search-trip.component.scss',
})
export class SearchTripComponent implements OnDestroy {
  optionsFrom: Station[] = [];

  optionsTo: Station[] = [];

  stations: Station[] = [];

  filteredStationsFrom: Observable<Station[]> | undefined;

  filteredStationsTo: Observable<Station[]> | undefined;

  searchForm: FormGroup;

  subscription: Subscription;

  fromStation?: Station;

  toStation?: Station;

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    private tripFacade: TripFacade,
    private stationFacade: StationFacade,
    private notificationService: NotificationService,
  ) {
    this.searchForm = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
    });
    this.stationFacade.loadStation();
    this.subscription = this.stationFacade.station$.subscribe((stations) => {
      this.stations = stations;
      this.filteredStationsFrom = this.searchForm.controls['from'].valueChanges.pipe(
        startWith(''),
        map((value) => this.filter(value || '', this.stations)),
      );
      this.filteredStationsTo = this.searchForm.controls['to'].valueChanges.pipe(
        startWith(''),
        map((value) => this.filter(value || '', this.stations)),
      );
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private filter(value: string, stations: Station[]): Station[] {
    const filterValue = value.toLowerCase();
    const station = stations.filter((station) => station.city.toLowerCase().includes(filterValue));
    return station;
  }

  setFromStationByType(): void {
    const station = this.stations.find(
      (sta) => this.searchForm.controls['from'].value.toLowerCase() === sta.city.toLowerCase(),
    );
    this.fromStation = station;
  }

  setToStationByType(): void {
    const station = this.stations.find(
      (sta) => this.searchForm.controls['to'].value.toLowerCase() === sta.city.toLowerCase(),
    );
    this.toStation = station;
  }

  setFromStation(st: Station): void {
    this.fromStation = st;
  }

  setToStation(st: Station): void {
    this.toStation = st;
  }

  get disabledForm() {
    return this.searchForm.invalid;
  }

  onSearch(): void {
    if (this.fromStation && this.toStation) {
      const params: SearchParams = {
        fromLatitude: this.fromStation?.latitude,
        fromLongitude: this.fromStation?.longitude,
        toLatitude: this.toStation?.latitude,
        toLongitude: this.toStation?.longitude,
        time: this.searchForm.controls['date'].value.toISOString(),
      };
      this.searchService.setSearchParams(params);
      this.searchService.setFilterActiveState(true);
      this.tripFacade.loadTrip(params);
    } else {
      if (this.fromStation === undefined) {
        this.searchForm.controls['from'].setErrors({ customError: "This station does'nt exist" });
        this.notificationService.openFailureSnackBar(
          `Station  ${this.searchForm.controls['from'].value} does'nt exists`,
        );
      }
      if (this.toStation === undefined) {
        this.searchForm.controls['to'].setErrors({ customError: "This station does'nt exist" });
        this.notificationService.openFailureSnackBar(
          `Station  ${this.searchForm.controls['to'].value} does'nt exists`,
        );
      }
    }
  }

  get toError() {
    const errors = { ...this.searchForm.controls['to'].errors };
    const err = errors ? errors['customError'] : '';
    return err;
  }

  get fromError() {
    const errors = { ...this.searchForm.controls['from'].errors };
    const err = errors ? errors['customError'] : '';
    return err;
  }

  swapCities(): void {
    const fromControl = this.searchForm.controls['from'];
    const toControl = this.searchForm.controls['to'];
    const temp = this.fromStation;
    this.fromStation = this.toStation;
    this.toStation = temp;
    fromControl.setValue(this.fromStation?.city);
    toControl.setValue(this.toStation?.city);
    this.onSearch();
  }
}
