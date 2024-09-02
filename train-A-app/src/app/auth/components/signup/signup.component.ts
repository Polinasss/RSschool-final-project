import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

type ErrorsHandler = Readonly<{
  invalidFields: (message: string) => void;
  invalidEmail: (message: string) => void;
  invalidPassword: (message: string) => void;
  invalidUniqueKey: (message: string) => void;
}>;

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnDestroy {
  signupForm: FormGroup;

  signupStatus = false;

  isSubmitting = false;

  formWasFilled = false;

  private subscriptions: Subscription = new Subscription();

  private errorsHandler: ErrorsHandler = {
    invalidFields: (message: string) => {
      this.email?.setErrors({ serverError: message });
      this.password?.setErrors({ serverError: message });
      this.repeatPassword?.setErrors({ serverError: message });
    },
    invalidEmail: (message: string) => {
      this.email?.setErrors({ serverError: message });
    },
    invalidPassword: (message: string) => {
      this.password?.setErrors({ serverError: message });
    },
    invalidUniqueKey: () => {
      this.email?.setErrors({ serverError: 'Account with this email already exists' });
    },
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
  ) {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.pattern(/^[\w\d_]+@[\w\d_]+.\w{2,7}$/)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^\S*$/)]],
        repeatPassword: ['', [Validators.required]],
      },
      {
        validators: [this.passwordsValidator],
      },
    );
  }

  passwordsValidator(formGroup: FormGroup) {
    const { value: password } = formGroup.controls['password'];
    const { value: confirmPassword } = formGroup.controls['repeatPassword'];
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get repeatPassword() {
    return this.signupForm.get('repeatPassword');
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isSubmitting = true;
      const { email, password } = this.signupForm.getRawValue();
      const sub = this.http
        .post<{ token: string }>('/api/signup/', {
          email,
          password,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/signin']);
          },
          error: (error) => {
            const reasons = Object.keys(this.errorsHandler) as Array<
              keyof typeof this.errorsHandler
            >;
            const reason = reasons.find((r) => r === error.error.reason);
            if (reason) {
              this.errorsHandler[reason](error.error.message);
            } else {
              this.signupForm.setErrors({ serverError: error.message });
            }
            this.isSubmitting = false;
          },
          complete: () => {
            this.isSubmitting = false;
          },
        });
      this.subscriptions.add(sub);
    }
    this.formWasFilled = true;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.signupForm.get(controlName);
    if (control) return control.invalid && control.touched;
    return false;
  }

  get isRepeatPassInvalid() {
    return (
      this.signupForm.errors?.['passwordNotMatch'] &&
      this.signupForm.controls['repeatPassword'].value.length > 0
    );
  }

  get disabledForm() {
    return this.signupForm.invalid || this.isSubmitting;
  }

  get unknownServerError() {
    return this.signupForm.errors?.['serverError'];
  }

  getErrorMessage(controlName: string): string {
    const errors = this.signupForm.get(controlName)?.errors;
    if (errors) {
      if (errors['required']) {
        switch (controlName) {
          case 'email':
            return 'Please enter a email';
          case 'password':
            return 'Please enter a password';
          default:
            return 'This field is required';
        }
      }
      if (errors['pattern']) {
        return 'Email is not valid';
      }
      if (errors['minlength']) {
        return `The ${controlName} is too short`;
      }
      if (errors['serverError']) {
        return errors['serverError'];
      }
    }
    return '';
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
