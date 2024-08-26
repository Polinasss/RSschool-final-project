import { Component } from '@angular/core';
import { SearchTripComponent } from '../search-trip/search-trip.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchTripComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
