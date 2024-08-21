import { Component } from '@angular/core';
import { SignupComponent } from '../../components/signup/signup.component';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [SignupComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent {}
