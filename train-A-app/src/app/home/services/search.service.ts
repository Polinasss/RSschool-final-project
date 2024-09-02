import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Station } from 'app/admin-overview/models/station';
import { Trip } from '../models/trip';

export interface SearchParams {
  fromLatitude: number;
  fromLongitude: number;
  toLatitude: number;
  toLongitude: number;
  time: string;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  private filterIsActive = new BehaviorSubject<boolean>(false);

  private tripSearchParams = new BehaviorSubject<SearchParams>({
    fromLatitude: 0,
    fromLongitude: 0,
    toLatitude: 0,
    toLongitude: 0,
    time: new Date().toISOString(),
  });

  filterIsActive$ = this.filterIsActive.asObservable();

  tripSearchParams$ = this.tripSearchParams.asObservable();

  setFilterActiveState(active: boolean): void {
    this.filterIsActive.next(active);
  }

  setSearchParams(params: SearchParams): void {
    this.tripSearchParams.next(params);
  }

  getSearchParams(): SearchParams {
    return this.tripSearchParams.value;
  }

  getStations() {
    return this.http.get<Station[]>('/api/station/');
  }

  searchStations(params: SearchParams) {
    return this.http.get<Trip>('/api/search', {
      params: { ...params },
    });
  }
}
