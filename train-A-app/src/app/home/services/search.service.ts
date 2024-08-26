import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stations } from '../models/response.types';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getStations() {
    return this.http.get<Stations>('/api/station/');
  }

  searchStations(params?: { [param: string]: number }) {
    return this.http.get<Stations>('/api/search', { params });
  }
}
