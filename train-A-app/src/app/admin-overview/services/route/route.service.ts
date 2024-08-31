import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Route, RouteResponse } from 'app/admin-overview/models/route';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private http = inject(HttpClient);

  public loadRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>('/api/route/');
  }

  public addRoute(newRoute: Partial<Route>): Observable<RouteResponse> {
    return this.http.post<RouteResponse>('/api/route/', newRoute);
  }

  public updateRoute(newRoute: Route): Observable<number> {
    return this.http.put<number>(`/api/route/${newRoute.id}`, newRoute);
  }

  public deleteRoute(id: number): Observable<Route> {
    return this.http.delete<Route>(`/api/route/${id}`);
  }
}
