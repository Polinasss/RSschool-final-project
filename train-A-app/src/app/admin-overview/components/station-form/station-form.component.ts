import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MOCK_STATIONS } from '../../models/mocked-data';
import { LocationData, Station } from '../../models/station';

@Component({
  selector: 'app-station-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatSelect,
    MatOption,
    MatAutocompleteModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './station-form.component.html',
  styleUrl: './station-form.component.scss',
})
export class StationFormComponent implements OnInit, OnChanges {
  @Input() formGroup!: FormGroup;

  @Input() locationData: LocationData | null = null;

  @Output() stationAdded = new EventEmitter<Station>();

  public stations: Station[] = MOCK_STATIONS;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addInitialConnectedCities();
  }

  ngOnChanges() {
    if (this.locationData) {
      this.updateFormFields();
    }
  }

  private updateFormFields(): void {
    if (this.locationData) {
      this.formGroup.patchValue({
        city: this.locationData.city,
        latitude: this.locationData.latitude,
        longitude: this.locationData.longitude,
      });
    }
  }

  get cityControl() {
    return this.formGroup.get('city');
  }

  get latitudeControl() {
    return this.formGroup.get('latitude');
  }

  get longitudeControl() {
    return this.formGroup.get('longitude');
  }

  get connectedToControl(): FormArray {
    return this.formGroup.get('connectedTo') as FormArray;
  }

  get connectedToControlAsFormControl(): FormControl[] {
    return this.connectedToControl.controls as FormControl[];
  }

  public addConnectedCity(): void {
    this.connectedToControl.push(this.fb.control('', Validators.required));
  }

  private addInitialConnectedCities(): void {
    while (this.connectedToControl.length < 3) {
      this.addConnectedCity();
    }
  }

  public displayFn(id: number): string {
    if (id) {
      const index = this.stations.findIndex((station) => station.id === id);
      return this.stations[index].city;
    }
    return '';
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const { city, latitude, longitude, connectedTo } = this.formGroup.value;
      const maxId = this.stations.reduce((max, station) => Math.max(max, station.id), 0);

      const connectedWithDistance = connectedTo.map((connectedId: string) => {
        const connectedStation = this.stations.find(
          (station) => station.id === parseInt(connectedId, 10),
        );
        if (connectedStation) {
          const distance = this.calculateDistance(
            latitude,
            longitude,
            connectedStation.latitude,
            connectedStation.longitude,
          );
          return { id: connectedId, distance: Math.round(distance) };
        }
        return { id: connectedId, distance: 0 };
      });

      const newStation: Station = {
        id: maxId + 1,
        city,
        latitude,
        longitude,
        connectedTo: connectedWithDistance,
      };

      this.stationAdded.emit(newStation);
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.formGroup.reset();

    this.connectedToControl.controls.forEach((control) => {
      control.reset();
      control.setErrors(null);
    });

    this.cityControl?.setErrors(null);
    this.latitudeControl?.setErrors(null);
    this.longitudeControl?.setErrors(null);
  }
}
