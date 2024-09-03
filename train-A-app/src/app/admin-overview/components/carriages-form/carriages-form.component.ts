import { Component, inject, Input, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgIf } from '@angular/common';
import { map, Subject, takeUntil } from 'rxjs';
import {
  Carriage,
  CarriageDataForSchema,
  CarriageFormEditMode,
} from 'app/admin-overview/models/carriage';
import { CarriageSchemaComponent } from 'app/shared/components/carriage-schema/carriage-schema.component';
import { CarriageFacade } from 'app/admin-overview/_state/carriage/carriage.facade';
import { CarriagesPanelService } from 'app/admin-overview/services/carriages-panel/carriages-panel.service';

@Component({
  selector: 'app-carriages-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, CarriageSchemaComponent, NgIf, CommonModule],
  templateUrl: './carriages-form.component.html',
  styleUrls: ['./carriages-form.component.scss', './../../../core/styles/common.scss'],
})
export class CarriagesFormComponent implements OnInit, OnDestroy, AfterViewInit {
  private fb: FormBuilder = inject(FormBuilder);

  private carriageFacade = inject(CarriageFacade);

  private panelService = inject(CarriagesPanelService);

  private destroy$: Subject<void> = new Subject<void>();

  public carriageForm!: FormGroup<{
    name: FormControl<string>;
    rows: FormControl<string>;
    leftSeats: FormControl<string>;
    rightSeats: FormControl<string>;
  }>;

  public carriageData!: CarriageDataForSchema;

  public isDuplicateName!: boolean;

  @Input() editMode: CarriageFormEditMode = 'create';

  @Input() carriageForUpdating!: Carriage | null;

  public ngOnInit() {
    this.isDuplicateName = false;
    this.carriageForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      rows: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      leftSeats: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      rightSeats: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    });

    this.carriageForm
      .get('name')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isDuplicateName = false;
      });

    this.carriageForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.carriageForm.valid) {
        this.isDuplicateName = false;
        this.updateCarriageData();
      }
    });
  }

  ngAfterViewInit() {
    this.panelService.panelState$.pipe(takeUntil(this.destroy$)).subscribe((updateInfo) => {
      if (updateInfo.panelId === 'panel') {
        this.editMode = updateInfo.editMode ?? 'create';
        this.carriageForUpdating = updateInfo.carriage ?? null;
        if (this.editMode && this.carriageForUpdating) {
          this.updateFormValues();
        } else {
          this.carriageForm.reset();
        }
      }
    });
  }

  get rows() {
    return this.carriageForm.get('rows');
  }

  get leftSeats() {
    return this.carriageForm.get('leftSeats');
  }

  get rightSeats() {
    return this.carriageForm.get('rightSeats');
  }

  private updateCarriageData(): void {
    this.carriageData = {
      name: this.carriageForm.get('name')?.value || '',
      rows: this.carriageForm.get('rows')?.value?.toString() || '',
      leftSeats: this.carriageForm.get('leftSeats')?.value?.toString() || '',
      rightSeats: this.carriageForm.get('rightSeats')?.value?.toString() || '',
    };
  }

  private updateFormValues() {
    if (this.carriageForUpdating) {
      this.carriageForm.setValue({
        name: this.carriageForUpdating.name,
        rows: this.carriageForUpdating.rows.toString(),
        leftSeats: this.carriageForUpdating.leftSeats.toString(),
        rightSeats: this.carriageForUpdating.rightSeats.toString(),
      });
    }
  }

  private closeFormPanel() {
    this.carriageForm.reset();
    this.panelService.togglePanel('panel', 'save');
  }

  public onSave() {
    if (this.carriageForm.valid) {
      const newCarriage: Omit<Carriage, 'code'> = {
        name: this.carriageForm.get('name')?.value || '',
        rows: Number(this.carriageForm.get('rows')?.value),
        leftSeats: Number(this.carriageForm.get('leftSeats')?.value),
        rightSeats: Number(this.carriageForm.get('rightSeats')?.value),
      };
      if (this.editMode === 'edit') {
        this.carriageFacade.carriage$
          .pipe(
            takeUntil(this.destroy$),
            map((carriages) =>
              carriages
                .filter(
                  (carriage) =>
                    carriage.code.toLocaleUpperCase() !==
                    this.carriageForUpdating?.code.toLocaleUpperCase(),
                )
                .some((carriage) => carriage.name === newCarriage.name),
            ),
          )
          .subscribe((isDuplicate) => {
            if (isDuplicate) {
              this.isDuplicateName = true;
            } else if (this.carriageForUpdating) {
              this.carriageFacade.updateCarriage({
                code: this.carriageForUpdating?.code,
                ...newCarriage,
              });
              this.closeFormPanel();
            }
          });
      } else {
        this.carriageFacade.carriage$
          .pipe(
            takeUntil(this.destroy$),
            map((carriages) =>
              carriages.some(
                (carriage) => carriage.name.toLowerCase() === newCarriage.name.toLowerCase(),
              ),
            ),
          )
          .subscribe((isDuplicate) => {
            if (isDuplicate) {
              this.isDuplicateName = true;
            } else {
              this.carriageFacade.addCarriage(newCarriage);
              this.closeFormPanel();
            }
          });
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
