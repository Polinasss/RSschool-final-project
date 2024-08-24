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
import {
  CarriageDataForSchema,
  CarriageSchemaComponent,
} from '../../../shared/components/carriageSchema/carriageSchema.component';

@Component({
  selector: 'app-carriages-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, CarriageSchemaComponent, NgIf, CommonModule],
  templateUrl: './carriages-form.component.html',
  styleUrls: ['./carriages-form.component.scss', './../../../core/styles/common.scss'],
})
export class CarriagesFormComponent implements OnInit, OnDestroy {
  private fb: FormBuilder = inject(FormBuilder);

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

  public onSave() {
    console.log(this.carriageData);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
