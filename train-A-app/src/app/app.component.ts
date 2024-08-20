import { HttpClient } from '@angular/common/http';
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

  stations = '';

  constructor(private http: HttpClient) {
    this.http.get<unknown[]>('/api/station/').subscribe((stations) => {
      this.stations = JSON.stringify(stations[0], null, 4);
      console.log({ stations });
    });
  }
}
