import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CreateButtonComponent } from 'app/shared/components/create-button/create-button.component';

@Component({
  selector: 'app-ride-header',
  standalone: true,
  imports: [CreateButtonComponent, MatIcon],
  templateUrl: './ride-header.component.html',
  styleUrl: './ride-header.component.scss',
})
export class RideHeaderComponent {
  @Input() id!: string | null;

  constructor(
    public location: Location,
    public router: Router,
  ) {}

  public createRide() {
    console.log('create');
  }

  public goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/admin/routes']);
    }
  }
}
