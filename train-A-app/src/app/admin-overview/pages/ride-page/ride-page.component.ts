import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RideHeaderComponent } from 'app/admin-overview/components/ride-header/ride-header.component';
import { RideListComponent } from 'app/admin-overview/components/ride-list/ride-list.component';

@Component({
  selector: 'app-ride-page',
  standalone: true,
  imports: [RideHeaderComponent, RideListComponent],
  templateUrl: './ride-page.component.html',
  styleUrl: './ride-page.component.scss',
})
export class RidePageComponent implements OnInit {
  public id: string | null = null;

  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }
}
