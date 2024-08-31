import { Component, Input } from '@angular/core';
import { CreateButtonComponent } from 'app/shared/components/create-button/create-button.component';

@Component({
  selector: 'app-ride-header',
  standalone: true,
  imports: [CreateButtonComponent],
  templateUrl: './ride-header.component.html',
  styleUrl: './ride-header.component.scss',
})
export class RideHeaderComponent {
  @Input() id!: string | null;

  public createRide() {
    console.log('create');
  }
}
