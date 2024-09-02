import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carriage, CarriageResponse } from '../../models/carriage';

@Injectable({
  providedIn: 'root',
})
export class CarriageService {
  private http = inject(HttpClient);

  public loadCarriage(): Observable<Carriage[]> {
    return this.http.get<Carriage[]>('/api/carriage/');
  }

  public addCarriage(newCarriage: Partial<Carriage>): Observable<CarriageResponse> {
    return this.http.post<CarriageResponse>('/api/carriage/', newCarriage);
  }

  public updateCarriage(newCarriage: Carriage): Observable<string> {
    return this.http.put<string>(`/api/carriage/${newCarriage.code}`, newCarriage);
  }
}
