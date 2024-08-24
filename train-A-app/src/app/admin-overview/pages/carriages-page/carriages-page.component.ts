import { Component } from '@angular/core';
import { CarriagesPanelComponent } from '../../components/carriages-panel/carriages-panel.component';
import { CarriagesListComponent } from '../../components/carriages-list/carriages-list.component';

@Component({
  selector: 'app-carriages-page',
  standalone: true,
  imports: [CarriagesPanelComponent, CarriagesListComponent],
  templateUrl: './carriages-page.component.html',
  styleUrl: './carriages-page.component.scss',
})
export class CarriagesPageComponent {}
