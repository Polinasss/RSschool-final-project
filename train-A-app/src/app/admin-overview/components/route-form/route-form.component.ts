import { AsyncPipe, NgFor } from '@angular/common';
import { AfterViewInit, Component, inject, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CarriageFacade } from 'app/admin-overview/_state/carriage/carriage.facade';
import { RouteFacade } from 'app/admin-overview/_state/route/route.facade';
import { StationFacade } from 'app/admin-overview/_state/station/station.facade';
import { CarriageFormEditMode } from 'app/admin-overview/models/carriage';
import { Route } from 'app/admin-overview/models/route';
import { ConnectedCities, Station } from 'app/admin-overview/models/station';
import { RoutePanelService } from 'app/admin-overview/services/route-panel/route-panel.service';
import { combineLatest, map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface OptionsForStation {
  [key: number]: Observable<Station[]>;
}

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    AsyncPipe,
    ReactiveFormsModule,
    MatButtonModule,
    NgFor,
  ],
  templateUrl: './route-form.component.html',
  styleUrl: './route-form.component.scss',
})
export class RouteFormComponent implements OnInit, AfterViewInit {
  @Input() editMode: CarriageFormEditMode = 'create';

  @Input() routeForUpdating!: Route | null;

  private carriageFacade = inject(CarriageFacade);

  private stationFacade = inject(StationFacade);

  private routeFacade = inject(RouteFacade);

  private panelService = inject(RoutePanelService);

  private fb: FormBuilder = inject(FormBuilder);

  private MIN_ITEMS_IN_ROUTE = 4;

  readonly carriages$ = this.carriageFacade.carriage$;

  readonly stations$ = this.stationFacade.station$;

  public filteredStationOptionsMap: OptionsForStation = {};

  public routesForm!: FormGroup;

  private panel$ = this.panelService.panelState$.pipe(takeUntilDestroyed());

  ngOnInit() {
    this.routesForm = this.fb.group({
      selectStations: this.fb.array(
        [this.createSelectControl()],
        Validators.minLength(this.MIN_ITEMS_IN_ROUTE),
      ),
      selectCarriages: this.fb.array(
        [this.createSelectControl()],
        Validators.minLength(this.MIN_ITEMS_IN_ROUTE),
      ),
    });
  }

  ngAfterViewInit() {
    this.panel$.subscribe((updateInfo) => {
      if (updateInfo.panelId === 'panelRoute') {
        this.editMode = updateInfo.editMode ?? 'create';
        this.routeForUpdating = updateInfo.route ?? null;
        this.cleanFormPanel();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (this.editMode === 'create') {
          this.updateFilteredStationOptions(0);
        } else if (this.editMode && this.routeForUpdating) {
          this.updateFormValues();
        }
      }
    });
  }

  get stations(): FormArray {
    return this.routesForm.get('selectStations') as FormArray;
  }

  get carriages(): FormArray {
    return this.routesForm.get('selectCarriages') as FormArray;
  }

  private createSelectControl(value: number | string | null = null): FormControl {
    return this.fb.control(value);
  }

  private updateFormValues() {
    if (this.routeForUpdating) {
      this.stations.clear();
      this.carriages.clear();
      this.routeForUpdating.path.forEach((station: number, index: number, array: number[]) => {
        this.generateStationOptions(index, station).subscribe(() =>
          this.stations.push(this.createSelectControl(station)),
        );
        if (index === array.length - 1) {
          this.updateFilteredStationOptions(index + 1);
        }
      });
      this.routeForUpdating.carriages.forEach((carriage) => {
        this.carriages.push(this.createSelectControl(carriage));
      });
      this.stations.push(this.createSelectControl());
      this.carriages.push(this.createSelectControl());
    }
  }

  private generateStationOptions(index: number, stationId: number): Observable<Station[]> {
    this.filteredStationOptionsMap[index] = combineLatest([this.stations$]).pipe(
      map(([stations]) => {
        let filteredStations = stations.filter((station) =>
          station.connectedTo.some((connection) => connection.id === stationId),
        );

        const specificStation = stations.find((station) => station.id === stationId);
        if (specificStation && !filteredStations.includes(specificStation)) {
          filteredStations = [specificStation, ...filteredStations];
        }

        return filteredStations;
      }),
    );

    return this.filteredStationOptionsMap[index];
  }

  private updateFilteredStationOptions(index: number) {
    if (index === 0) {
      this.filteredStationOptionsMap[index] = this.stations$;
    } else {
      const lastSelectedStationId: number = this.stations.at(index - 1)?.value;
      this.filteredStationOptionsMap[index] = combineLatest([this.stations$]).pipe(
        map(([stations]) => {
          const connectedCities = stations.find(
            (station) => station.id === lastSelectedStationId,
          )?.connectedTo;
          return stations.filter((station) =>
            connectedCities?.some((city: ConnectedCities) => station.id === city.id),
          );
        }),
      );
    }
  }

  public onStationsChange(index: number): void {
    if (index !== this.stations.length - 1) {
      for (let i = this.stations.length - 1; i > index; i -= 1) {
        this.stations.removeAt(i);
      }
    }
    this.stations.push(this.createSelectControl());
    this.updateFilteredStationOptions(index + 1);
  }

  public onCarriagesChange(index: number): void {
    if (index === this.carriages.length - 1) {
      this.carriages.push(this.createSelectControl());
    }
  }

  private removeLastElement<T>(array: T[]): T[] {
    array.pop();
    return array;
  }

  private cleanFormPanel() {
    this.routesForm.reset();
    this.clearFormArray(this.stations);
    this.clearFormArray(this.carriages);
    Object.keys(this.filteredStationOptionsMap).forEach(
      (key) => delete this.filteredStationOptionsMap[+key],
    );
  }

  private clearFormArray(formArray: FormArray) {
    while (formArray.length > 1) {
      formArray.removeAt(1);
    }
  }

  public onSubmit() {
    if (this.routesForm.valid) {
      const newRoute = {
        path: this.removeLastElement(this.stations.value) as number[],
        carriages: this.removeLastElement(this.carriages.value) as string[],
      };
      if (this.editMode === 'edit' && this.routeForUpdating) {
        this.routeFacade.updateRoute({
          id: this.routeForUpdating?.id,
          ...newRoute,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (this.editMode === 'create') {
        this.routeFacade.addRoute(newRoute);
      }
      this.cleanFormPanel();
      this.panelService.togglePanel('panelRoute', 'save');
    }
  }
}
