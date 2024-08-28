import { AsyncPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CarriageFacade } from 'app/admin-overview/_state/carriage/carriage.facade';
import { CarriageFormEditMode } from 'app/admin-overview/models/carriage';
import { Route } from 'app/admin-overview/models/route';

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, AsyncPipe, ReactiveFormsModule, MatButtonModule],
  templateUrl: './route-form.component.html',
  styleUrl: './route-form.component.scss',
})
export class RouteFormComponent {
  @Input() editMode: CarriageFormEditMode = 'create';

  @Input() routeForUpdating!: Route | null;

  private carriageFacade = inject(CarriageFacade);

  private fb: FormBuilder = inject(FormBuilder);

  readonly carriages$ = this.carriageFacade.carriage$;

  public routesForm!: FormGroup;

  constructor() {
    this.routesForm = this.fb.group({
      stations: this.fb.array([this.createSelectControl()]),
      carriages: this.fb.array([this.createSelectControl()]),
    });
  }

  get stations() {
    return this.routesForm.get('stations') as FormArray;
  }

  get carriages() {
    return this.routesForm.get('carriages') as FormArray;
  }

  createSelectControl(): FormControl {
    return this.fb.control(null);
  }

  onStationsChange(index: number): void {
    if (index === this.stations.length - 1) {
      this.stations.push(this.createSelectControl());
    }
  }

  onCarriagesChange(index: number): void {
    if (index === this.carriages.length - 1) {
      this.carriages.push(this.createSelectControl());
    }
  }

  onSubmit() {
    console.log(this.routesForm.value);
  }
}
