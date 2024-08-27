import { NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Route } from 'app/admin-overview/models/route';
import { CapitalizeFirstLetterPipe } from 'app/shared/pipe/capitalize-first-letter/capitalize-first-letter.pipe';

@Component({
  selector: 'app-route-item',
  standalone: true,
  imports: [MatCardModule, MatIconModule, NgFor, NgIf, CapitalizeFirstLetterPipe],
  templateUrl: './route-item.component.html',
  styleUrl: './route-item.component.scss',
})
export class RouteItemComponent {
  @Input() item!: Route;

  private router: Router = inject(Router);

  public onEdit() {}

  public onDelete() {}

  public assignRide() {
    this.router.navigate(['/admin/routes', this.item.id]);
  }
}
