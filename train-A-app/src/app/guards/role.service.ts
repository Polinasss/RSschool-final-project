import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

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

  public isAuthorized(): Observable<string> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<IProfile>('/api/profile/', { headers }).pipe(
        map((responce) => responce.role),
        catchError(() => 'guest'),
      );
    }
    return new Observable((observer) => {
      observer.next('guest');
      observer.complete();
    });
  }
}
