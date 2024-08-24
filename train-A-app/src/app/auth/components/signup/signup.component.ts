import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { Router, RouterLink, RouterOutlet } from '@angular/router';

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
export class SignupComponent {
  signupForm: FormGroup;

  loginStatus = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, this.passwordStrengthValidator]],
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

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.loginStatus = true;
      // this.authService.signup(this.signupForm.value);
      // this.router.navigate(['/']);
    }
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const { value } = control;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[!@#?$%^&*(),.?":{}|<>]/.test(value);
    const isValidLength = value.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && isValidLength;

    if (!passwordValid) {
      return {
        passwordStrength:
          "Your password isn't strong enough. Ensure it has at least 8 characters, upper and lowercase letters, numbers and at least one special character.",
      };
    }
    return null;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.signupForm.get(controlName);
    if (control) return control.invalid && control.touched;
    return false;
  }

  get isRepeatPassInvalid() {
    return (
      this.signupForm.errors?.['passwordNotMatch'] &&
      this.signupForm.controls['repeatPassword'].touched
    );
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
      if (errors['email']) {
        return 'Email is not valid';
      }
      if (errors['minlength']) {
        return `The ${controlName} is too short`;
      }

      if (errors['maxlength']) {
        return `The ${controlName} is too long`;
      }
      if (errors['passwordStrength']) {
        return "Your password isn't strong enough. Ensure it has at least 8 characters, upper and lowercase letters, numbers and at least one special character.";
      }
    }
    return '';
  }
}
