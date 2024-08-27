import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { Route } from 'app/home/models/trip';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [MatButtonModule, MatCard, MatCardTitle, DatePipe],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent implements OnInit {
  @Input() route!: Route;

  @Input() fromCity: string = '';

  @Input() toCity: string = '';

  departureTime = '';

  arrivalTime = '';

  duration: string | number = '';

  ngOnInit() {
    const segments = [...this.route.schedule[0].segments];
    const [dt] = [...segments[0].time];
    this.departureTime = dt;
    const [, at] = segments[segments.length - 1].time;
    this.arrivalTime = at;
    const arrivalTimeStamp = new Date(this.departureTime).getTime();
    const departureTimeStamp = new Date(this.arrivalTime).getTime();

    const durationDateTime = arrivalTimeStamp - departureTimeStamp;
    this.duration = durationDateTime;
  }
}
