import { Component, Input, OnInit } from '@angular/core';
import { Route, Schedule } from 'app/home/models/trip';
import { ScheduleItemComponent } from '../schedule-item/schedule-item.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [ScheduleItemComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent implements OnInit {
  @Input() route!: Route;

  @Input() fromCity: string = '';

  @Input() toCity: string = '';

  ways: Schedule[] = [];

  ngOnInit() {
    this.ways = [...this.route.schedule];
  }
}
