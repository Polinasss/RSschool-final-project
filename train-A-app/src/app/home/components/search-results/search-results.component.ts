import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { TripFacade } from 'app/home/_state/search.facade';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { SearchService } from 'app/home/services/search.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchResultComponent } from '../search-result/search-result.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [SearchResultComponent, AsyncPipe, JsonPipe, MatProgressSpinnerModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  private tripFacade = inject(TripFacade);

  private searchService = inject(SearchService);

  readonly trip$ = this.tripFacade.trip$;

  routes$ = this.tripFacade.routes$;

  readonly error$ = this.tripFacade.error$;

  readonly isLoading$ = this.tripFacade.isLoading$;

  readonly availableDates$ = this.tripFacade.availableDates$;

  fromCity: { stationId: number; city: string } = { stationId: 0, city: '' };

  toCity: { stationId: number; city: string } = { stationId: 0, city: '' };

  sb: Subscription = new Subscription();

  showFilter$ = this.searchService.filterIsActive$;

  ngOnInit() {
    this.sb = this.trip$.subscribe((trip) => {
      this.fromCity = { stationId: trip.from?.stationId || 0, city: trip.from?.city || '' };
      this.toCity = { stationId: trip.to?.stationId || 0, city: trip.to?.city || '' };
    });
    this.searchService.tripSearchParams$.subscribe((params) => {
      this.routes$ = this.tripFacade.getRoutesByDate(new Date(params.time));
    });
  }

  ngOnDestroy() {
    this.sb.unsubscribe();
  }
}
