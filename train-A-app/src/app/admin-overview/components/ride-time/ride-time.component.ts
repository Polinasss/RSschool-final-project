import { DatePipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-ride-time',
  standalone: true,
  imports: [MatIcon, NgIf, DatePipe, ReactiveFormsModule],
  templateUrl: './ride-time.component.html',
  styleUrl: './ride-time.component.scss',
})
export class RideTimeComponent implements OnInit {
  @Input() time!: [string, string];

  @Input() i!: number;

  @Input() length!: number;

  public editTimeIndex: number | null = null;

  public departureTime!: string;

  public arrivalTime!: string;

  public timeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.timeForm = this.fb.group({
      arrivalTime: [null, Validators.required],
      departureTime: [null, Validators.required],
    });
    if (this.time) {
      [this.arrivalTime, this.departureTime] = this.time as [string, string];
      this.initializeFormValues(this.arrivalTime, this.departureTime);
    }
  }

  private initializeFormValues(arrivalTime: string, departureTime: string) {
    if (this.i !== null) {
      this.timeForm.patchValue({
        arrivalTime: this.getTime(arrivalTime),
        departureTime: this.getTime(departureTime),
      });
    }
  }

  private getTime(timeString: string): string | null {
    if (timeString) {
      const date = new Date(timeString);
      return date.toISOString().slice(0, 16);
    }
    return null;
  }

  public onUpdateTime(index: number) {
    this.editTimeIndex = index;
    this.initializeFormValues(this.arrivalTime, this.departureTime);
  }

  public onSaveTime() {
    if (this.timeForm.valid) {
      this.editTimeIndex = null;
    }
  }
}
