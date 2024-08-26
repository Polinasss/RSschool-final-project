import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './create-button.component.html',
  styleUrl: './create-button.component.scss',
})
export class CreateButtonComponent {
  @Output() clickOnButton = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    this.clickOnButton.emit(event);
  }
}
