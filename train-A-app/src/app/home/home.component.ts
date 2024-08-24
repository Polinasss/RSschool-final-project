import { Component } from '@angular/core';
import { AdminOverviewPageComponent } from '../admin-overview/pages/admin-overview-page/admin-overview-page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AdminOverviewPageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
