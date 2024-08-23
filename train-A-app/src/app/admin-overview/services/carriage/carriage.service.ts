import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carriage } from '../../models/carriage';

@Injectable({
  providedIn: 'root',
})
export class CarriageService {
  private http = inject(HttpClient);

  public loadCarriage(): Observable<Carriage[]> {
    return this.http.get<Carriage[]>('/api/carriage/');
  }
}
