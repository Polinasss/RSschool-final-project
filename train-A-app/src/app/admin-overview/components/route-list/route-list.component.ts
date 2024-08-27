import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';
import { RouteFacade } from 'app/admin-overview/_state/route/route.facade';
import { RouteItemComponent } from '../route-item/route-item.component';

@Component({
  selector: 'app-route-list',
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
  templateUrl: './route-list.component.html',
  styleUrl: './route-list.component.scss',
})
export class RouteListComponent implements OnInit {
  private routeFacade = inject(RouteFacade);

  readonly routes$ = this.routeFacade.routes$;

  readonly error$ = this.routeFacade.error$;

  readonly isLoading$ = this.routeFacade.isLoading$;

  public ngOnInit() {
    this.routeFacade.loadRoutes();
  }

  // readonly formState$ = this.panelService.panelState$;

  // public openForm() {
  //   this.panelService.togglePanel('panel', 'create');
  // }
}
