import { Component, Input } from '@angular/core';
import { Route } from 'app/admin-overview/models/route';

@Component({
  selector: 'app-route-item',
  standalone: true,
  imports: [],
  templateUrl: './route-item.component.html',
  styleUrl: './route-item.component.scss',
})
export class RouteItemComponent {
  @Input() item!: Route;
}
