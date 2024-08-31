import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchService } from 'app/home/services/search.service';

@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, AsyncPipe],
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent {
  dates: { date: Date; availableRides: boolean }[] = [];

  selectedDateIndex: number = 0;

  showFilter$ = this.searchService.filterIsActive$;

  constructor(private searchService: SearchService) {
    this.searchService.filterIsActive$.subscribe((active) => {
      this.selectedDateIndex = 0;
      if (active) {
        const params = this.searchService.getSearchParams();
        const date = new Date(params.time);
        this.dates = this.generateDatesArray(date, 4);
      }
    });
  }

  private generateDatesArray(
    startDate: Date,
    numberOfDays: number,
  ): {
    date: Date;
    availableRides: boolean;
  }[] {
    const datesArray = [];

    for (let i = 0; i < numberOfDays; i += 1) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      datesArray.push({ date, availableRides: false });
    }
    return datesArray;
  }

  selectDate(index: number): void {
    this.selectedDateIndex = index;
    const params = this.searchService.getSearchParams();
    this.searchService.setSearchParams({ ...params, time: this.dates[index].date.toISOString() });
  }

  previousDate(): void {
    if (this.selectedDateIndex > 0) {
      this.selectDate(this.selectedDateIndex - 1);
    } else {
      const prevDate = new Date(this.dates[0].date);
      const prevDateNum = prevDate.getDate() - 1;
      prevDate.setDate(prevDateNum);
      this.dates = this.generateDatesArray(prevDate, 4);
      this.selectDate(this.selectedDateIndex);
    }
  }

  nextDate(): void {
    if (this.selectedDateIndex < this.dates.length - 1) {
      this.selectDate(this.selectedDateIndex + 1);
    } else {
      this.dates = this.generateDatesArray(this.dates[1].date, 4);
      this.selectDate(this.selectedDateIndex);
    }
  }
}
