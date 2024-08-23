import { TestBed } from '@angular/core/testing';

import { CarriageService } from './carriage.service';

describe('CarriageService', () => {
  let service: CarriageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarriageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
