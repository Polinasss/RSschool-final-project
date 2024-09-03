import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { NotificationService } from 'app/core/services/notification/notification.service';
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
    private notificationService: NotificationService,
  ) {}

  public createRide() {
    this.notificationService.openFailureSnackBar('The service is in development');
  }

  public goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/admin/routes']);
    }
  }
}
