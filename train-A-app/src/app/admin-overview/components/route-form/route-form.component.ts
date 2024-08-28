import { Component, Input } from '@angular/core';
import { CarriageFormEditMode } from 'app/admin-overview/models/carriage';
import { Route } from 'app/admin-overview/models/route';

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [],
  templateUrl: './route-form.component.html',
  styleUrl: './route-form.component.scss',
})
export class RouteFormComponent {
  @Input() editMode: CarriageFormEditMode = 'create';

  @Input() routeForUpdating!: Route | null;
}
