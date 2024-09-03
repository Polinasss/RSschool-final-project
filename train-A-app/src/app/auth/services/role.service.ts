import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { initialState } from '../_state/roles.reducer';

interface IProfile {
  name: string | null;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private http: HttpClient = inject(HttpClient);

  private userRole = initialState;

  public isAuthorized(): Observable<string> {
    const token = localStorage.getItem('token');

    if (token) {
      if (this.userRole !== initialState) {
        return of(this.userRole);
      }
      return this.http.get<IProfile>('/api/profile/').pipe(
        map((response) => response.role),
        catchError(() => 'guest'),
      );
    }
    return new Observable((observer) => {
      observer.next('guest');
      observer.complete();
    });
  }
}
