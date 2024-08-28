import { Component, Input } from '@angular/core';
import { Carriage, CarriageFormEditMode } from 'app/admin-overview/models/carriage';

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [],
  templateUrl: './route-form.component.html',
  styleUrl: './route-form.component.scss',
})
export class RouteFormComponent {
  @Input() editMode: CarriageFormEditMode = 'create';

  @Input() carriageForUpdating!: Carriage | null;
}
