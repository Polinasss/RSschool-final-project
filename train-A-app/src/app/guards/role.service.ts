import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  public userRole = 'Guest';
  // public userRole = 'Admin';
  // public userRole = 'Client';
}
