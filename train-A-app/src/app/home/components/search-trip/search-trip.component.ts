import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Station, Stations } from 'app/home/models/response.types';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, startWith, map, Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { SearchService } from 'app/home/services/search.service';
import { TripFacade } from 'app/home/_state/search.facade';

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
  optionsFrom: Stations = [];

  optionsTo: Stations = [];

  stations: Stations = [];

  filteredStationsFrom: Observable<Stations> | undefined;

  filteredStationsTo: Observable<Stations> | undefined;

  searchForm: FormGroup;

  subscription: Subscription;

  fromStation?: Station;

  toStation?: Station;

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    private tripFacade: TripFacade,
  ) {
    this.searchForm = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
    });
    this.subscription = this.searchService.getStations().subscribe((stations) => {
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

  private filter(value: string, stations: Stations): Stations {
    const filterValue = value.toLowerCase();
    const station = stations.filter((station) => station.city.toLowerCase().includes(filterValue));
    return station;
  }

  setFromStation(st: Station): void {
    console.log({ from: st });
    this.fromStation = st;
  }

  setToStation(st: Station): void {
    console.log({ to: st });
    this.toStation = st;
  }

  get from() {
    return this.searchForm.controls['from'].value.city;
  }

  get to() {
    return this.searchForm.get('to');
  }

  get date() {
    return this.searchForm.get('date');
  }

  get disabledForm() {
    return this.searchForm.invalid;
  }

  onSubmit(): void {
    console.log('data = ', this.searchForm.getRawValue());
    const params = {
      fromLatitude: this.fromStation!.latitude,
      fromLongitude: this.fromStation!.longitude,
      toLatitude: this.toStation!.latitude,
      toLongitude: this.toStation!.longitude,
      time: new Date(this.searchForm.controls['date'].value).toISOString(),
    };
    this.tripFacade.loadTrip(params);
  }
}
