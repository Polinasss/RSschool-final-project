import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Carriage } from 'app/admin-overview/models/carriages';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarriageService {
  private http = inject(HttpClient);

  public loadCarriage(): Observable<Carriage[]> {
    return this.http.get<Carriage[]>('/api/carriage/');
  }

  public addCarriage(newCarriage: Partial<Carriage>): Observable<string> {
    return this.http.post<string>('/api/carriage/', newCarriage);
  }

  public updateCarriage(newCarriage: Carriage): Observable<string> {
    return this.http.put<string>(`/api/carriage/${newCarriage.code}`, newCarriage);
  }
}
