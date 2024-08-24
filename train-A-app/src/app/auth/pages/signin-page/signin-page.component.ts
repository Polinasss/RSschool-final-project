import { Component } from '@angular/core';
import { SigninComponent } from 'app/auth/components/signin/signin.component';

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [SigninComponent],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss',
})
export class SigninPageComponent {}
