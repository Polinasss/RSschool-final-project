import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Station, StationBody, StationResponse } from 'app/admin-overview/models/station';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  private http = inject(HttpClient);

  public loadStation(): Observable<Station[]> {
    return this.http.get<Station[]>('/api/station');
  }

  public addStation(newStation: Partial<StationBody>): Observable<StationResponse> {
    return this.http.post<StationResponse>('/api/station', newStation);
  }

  public deleteStation(id: number): Observable<void> {
    return this.http.delete<void>(`/api/station/${id}`);
  }
}
