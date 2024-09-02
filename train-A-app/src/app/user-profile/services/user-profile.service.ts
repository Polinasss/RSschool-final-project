import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile, UserProfileBody, UserProfilePasswordBody } from '../models/user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private http = inject(HttpClient);

  public loadUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>('/api/profile');
  }

  public updateUserProfile(updateUser: Partial<UserProfileBody>): Observable<UserProfile> {
    return this.http.put<UserProfile>('/api/profile', updateUser);
  }

  public updateUserPassword(updatePassword: Partial<UserProfilePasswordBody>): Observable<void> {
    return this.http.put<void>('/api/profile/password', updatePassword);
  }

  public logoutUserProfile(): Observable<void> {
    return this.http.delete<void>(`/api/logout`);
  }
}
