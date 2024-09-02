import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { SearchTripComponent } from '../search-trip/search-trip.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { DateFilterComponent } from '../date-filter/date-filter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchTripComponent,
    SearchResultsComponent,
    DateFilterComponent,
    JsonPipe,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
