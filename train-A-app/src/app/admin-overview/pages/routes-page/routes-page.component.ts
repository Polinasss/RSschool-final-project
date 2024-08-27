import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { RouteItemComponent } from 'app/admin-overview/components/route-item/route-item.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-routes-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatProgressSpinnerModule,
    AsyncPipe,
    RouteItemComponent,
    NgTemplateOutlet,
    RouterOutlet,
  ],
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.scss',
})
export class RoutesPageComponent {}
