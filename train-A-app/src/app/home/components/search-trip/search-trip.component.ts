import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { Observable, startWith, map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

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
export class SearchTripComponent implements OnInit {
  // fromControl = new FormControl('');
  // toControl = new FormControl('');
  // dateControl = new FormControl('');
  optionsFrom: string[] = ['One', 'Two', 'Three'];

  optionsTo: string[] = ['4', '5', '6'];

  filteredOptionsFrom: Observable<string[]> | undefined;

  filteredOptionsTo: Observable<string[]> | undefined;

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.filteredOptionsFrom = this.searchForm.controls['from'].valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || '', this.optionsFrom)),
    );
    this.filteredOptionsTo = this.searchForm.controls['to'].valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || '', this.optionsTo)),
    );
    // this.searchForm.controls['date'].valueChanges.subscribe((val) =>
    //   console.log(new Date(val ?? '')),
    // );
  }

  private filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter((option) => option.toLowerCase().includes(filterValue));
  }

  get from() {
    return this.searchForm.get('from');
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
  }
}
