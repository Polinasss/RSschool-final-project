import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminOverviewPageComponent } from './admin-overview/pages/admin-overview-page/admin-overview-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminOverviewPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'train-A-app';
}
