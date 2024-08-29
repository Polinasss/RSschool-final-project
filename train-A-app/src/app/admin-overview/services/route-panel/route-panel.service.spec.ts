import { TestBed } from '@angular/core/testing';

import { RoutePanelService } from './route-panel.service';

describe('RoutePanelService', () => {
  let service: RoutePanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutePanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
