import { Component, inject, OnInit } from '@angular/core';
import { TripFacade } from 'app/home/_state/search.facade';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Route } from 'app/home/models/trip';
import { SearchResultComponent } from '../search-result/search-result.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [SearchResultComponent, AsyncPipe, JsonPipe],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  private tripFacade = inject(TripFacade);

  readonly trip$ = this.tripFacade.trip$;

  readonly error$ = this.tripFacade.error$;

  readonly isLoading$ = this.tripFacade.isLoading$;

  routes: Route[] = [];

  fromCity: string = '';

  toCity: string = '';

  ngOnInit() {
    this.trip$.subscribe((trip) => {
      this.routes = trip.routes;
      this.fromCity = trip.from?.city || '';
      this.toCity = trip.to?.city || '';
    });
  }
}
