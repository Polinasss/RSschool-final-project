import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stations } from '../models/response.types';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getStations() {
    return this.http.get<Stations>('/api/station/');
  }

  searchStations(params: { [param: string]: number | string }) {
    return this.http.get<Trip>('/api/search', { params });
  }
}
