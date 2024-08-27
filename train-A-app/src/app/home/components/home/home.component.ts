import { Component } from '@angular/core';
import { SearchTripComponent } from '../search-trip/search-trip.component';
import { SearchResultsComponent } from '../search-results/search-results.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchTripComponent, SearchResultsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
