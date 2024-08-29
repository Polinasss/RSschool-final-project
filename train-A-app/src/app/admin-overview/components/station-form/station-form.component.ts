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
import { MatButtonModule } from '@angular/material/button';
import { LocationData, Station, StationBody } from '../../models/station';

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
    MatButtonModule,
  ],
  templateUrl: './station-form.component.html',
  styleUrl: './station-form.component.scss',
})
export class StationFormComponent implements OnInit, OnChanges {
  @Input() stationFormGroup!: FormGroup;

  @Input() locationData: LocationData | null = null;

  @Output() stationAdded = new EventEmitter<StationBody>();

  @Input() stations!: Station[];

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
      this.stationFormGroup.patchValue({
        city: this.locationData.city,
        latitude: this.locationData.latitude,
        longitude: this.locationData.longitude,
      });
    }
  }

  get cityControl() {
    return this.stationFormGroup.get('city');
  }

  get latitudeControl() {
    return this.stationFormGroup.get('latitude');
  }

  get longitudeControl() {
    return this.stationFormGroup.get('longitude');
  }

  get connectedToControl(): FormArray {
    return this.stationFormGroup.get('connectedTo') as FormArray;
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

  public onSubmit(): void {
    if (this.stationFormGroup.valid) {
      const { city, latitude, longitude, connectedTo } = this.stationFormGroup.value;

      const newStation: StationBody = {
        city,
        latitude,
        longitude,
        relations: connectedTo,
      };

      this.stationAdded.emit(newStation);
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.locationData = null;
    this.stationFormGroup.reset();
    this.cityControl?.setErrors(null);
    this.latitudeControl?.setErrors(null);
    this.longitudeControl?.setErrors(null);

    this.connectedToControl.controls.forEach((control) => {
      control.reset();
      control.setErrors(null);
    });
  }
}
