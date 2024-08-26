import { TestBed } from '@angular/core/testing';

import { CarriagesPanelService } from './carriages-panel.service';

describe('CarriagesPanelService', () => {
  let service: CarriagesPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarriagesPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
