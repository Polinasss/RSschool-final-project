import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Carriage, CarriageDataForSchema } from 'app/admin-overview/models/carriage';
import { CarriageSchemaComponent } from 'app/shared/components/carriage-schema/carriage-schema.component';
import { CarriageFacade } from 'app/admin-overview/_state/carriage/carriage.facade';

@Component({
  selector: 'app-carriages-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, CarriageSchemaComponent, NgIf, CommonModule],
  templateUrl: './carriages-form.component.html',
  styleUrls: ['./carriages-form.component.scss', './../../../core/styles/common.scss'],
})
export class CarriagesFormComponent implements OnInit, OnDestroy {
  private fb: FormBuilder = inject(FormBuilder);

  private carriageFacade = inject(CarriageFacade);

  private destroy$: Subject<void> = new Subject<void>();

  public carriageForm!: FormGroup<{
    name: FormControl<string>;
    rows: FormControl<string>;
    leftSeats: FormControl<string>;
    rightSeats: FormControl<string>;
  }>;

  public carriageData!: CarriageDataForSchema;

  public ngOnInit() {
    this.carriageForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      rows: ['', [Validators.required, Validators.min(1)]],
      leftSeats: ['', [Validators.required, Validators.min(1)]],
      rightSeats: ['', [Validators.required, Validators.min(1)]],
    });

    this.carriageForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.carriageForm.valid) {
        this.updateCarriageData();
      }
    });
  }

  private updateCarriageData(): void {
    this.carriageData = {
      name: this.carriageForm.get('name')?.value || '',
      rows: this.carriageForm.get('rows')?.value?.toString() || '',
      leftSeats: this.carriageForm.get('leftSeats')?.value?.toString() || '',
      rightSeats: this.carriageForm.get('rightSeats')?.value?.toString() || '',
    };
  }

  //   private updateFormValues() {
  //     if (this.carriageData) {
  //       this.carriageForm.setValue({
  //         name: this.carriageData.name,
  //         rows: this.carriageData.rows,
  //         leftSeats: this.carriageData.leftSeats,
  //         rightSeats: this.carriageData.rightSeats
  //       });
  //     }
  //   }
  // }

  public onSave() {
    if (this.carriageForm.valid) {
      const newCarriage: Omit<Carriage, 'code'> = {
        name: this.carriageForm.get('name')?.value || '',
        rows: Number(this.carriageForm.get('rows')?.value),
        leftSeats: Number(this.carriageForm.get('leftSeats')?.value),
        rightSeats: Number(this.carriageForm.get('rightSeats')?.value),
      };
      // if (true) {
      this.carriageFacade.addCarriage(newCarriage);
      this.carriageForm.reset();
      // } else {
      //   this.carriageFacade.addCarriage(newCarriage);
      // }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
