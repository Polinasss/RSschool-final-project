import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Station } from 'app/admin-overview/models/station';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  private http = inject(HttpClient);

  public loadStation(): Observable<Station[]> {
    return this.http.get<Station[]>('/api/station');
  }

  public addStation(newStation: Partial<Station>): Observable<number> {
    return this.http.post<number>('/api/station', newStation);
  }

  public deleteStation(id: number): Observable<number> {
    return this.http.delete<number>(`/api/station/${id}`);
  }
}
