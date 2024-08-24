import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CarriagesFormComponent } from '../carriages-form/carriages-form.component';

@Component({
  selector: 'app-carriages-panel',
  standalone: true,
  imports: [MatExpansionModule, CarriagesFormComponent],
  templateUrl: './carriages-panel.component.html',
  styleUrl: './carriages-panel.component.scss',
})
export class CarriagesPanelComponent {}
