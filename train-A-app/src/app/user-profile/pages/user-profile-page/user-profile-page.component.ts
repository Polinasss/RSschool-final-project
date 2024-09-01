import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { UserProfileFacade } from 'app/user-profile/_state/user-profile.facade';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from 'app/core/services/notification/notification.service';
import { UserProfile, UserProfileBody } from 'app/user-profile/models/user-profile';
import { Router } from '@angular/router';
import { EditEmailFormComponent } from '../../components/edit-email-form/edit-email-form.component';
import { EditNameFormComponent } from '../../components/edit-name-form/edit-name-form.component';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    EditNameFormComponent,
    EditEmailFormComponent,
  ],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss',
})
export class UserProfilePageComponent implements OnInit, OnDestroy {
  userNameForm: FormGroup;

  userEmailForm: FormGroup;

  private userProfileFacade = inject(UserProfileFacade);

  private userProfile$ = this.userProfileFacade.user$;

  readonly error$ = this.userProfileFacade.error$;

  private destroy$: Subject<void> = new Subject<void>();

  public userProfile: UserProfile = { name: '', email: '', role: '' };

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    this.userNameForm = this.fb.group({
      userName: [this.userProfile.name, [Validators.required, Validators.minLength(3)]],
    });
    this.userEmailForm = this.fb.group({
      userEmail: [this.userProfile.email, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.userProfileFacade.loadUserProfile();
    this.error$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      if (error) {
        this.notificationService.openFailureSnackBar(error);
      }
    });

    this.userProfile$.pipe(takeUntil(this.destroy$)).subscribe((user: UserProfile) => {
      this.userProfile = user;
    });
  }

  onNameChanged(userName: string) {
    const updatedUserProfile: UserProfileBody = {
      ...this.userProfile,
      name: userName,
    };
    this.userProfileFacade.updateUserProfile(updatedUserProfile);
  }

  onEmailChanged(userEmail: string) {
    const updatedUserProfile: UserProfileBody = {
      ...this.userProfile,
      email: userEmail,
    };
    this.userProfileFacade.updateUserProfile(updatedUserProfile);
  }

  onLogout() {
    this.userProfileFacade.logoutUserProfile();
    this.router.navigate(['/signin']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
