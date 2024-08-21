import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, MatButtonModule, NgIf, CommonModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', './../../../core/styles/common.scss'],
})
export class SigninComponent implements OnInit {
  public isSubmitted: boolean = false;

  public loginForm!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(private fb: FormBuilder) {}

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

  // TODO: replace to auth.service
  public signIn() {
    console.log('submit form');
  }
}
