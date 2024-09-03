import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public loadOrder(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/order');
  }

  public loadUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  public deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`/api/order/${id}`);
  }
}
