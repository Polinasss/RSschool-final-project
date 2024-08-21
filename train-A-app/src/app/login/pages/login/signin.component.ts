import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

interface LoginInterface {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, MatButtonModule, NgIf, CommonModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', './../../../core/styles/common.scss'],
})
export class SigninComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);

  private http: HttpClient = inject(HttpClient);

  private router: Router = inject(Router);

  public isSubmitted: boolean = false;

  public loginForm!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  public ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w\d_]+@[\w\d_]+.\w{2,7}$/)]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public onSubmit() {
    this.isSubmitted = true;
    this.signIn();
  }

  // TODO: replace it to auth service
  public signIn() {
    const value = this.loginForm.getRawValue();
    this.http
      .post<{ user: LoginInterface }>('/api/signin', {
        email: value.email,
        password: value.password,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('token', 'response');
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          console.log(error);
          this.email?.setErrors({ serverError: true });
          this.password?.setErrors({ serverError: true });
        },
      });
  }
}
