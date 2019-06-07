import { TestBed } from '@angular/core/testing';

import { WsconnService } from './wsconn.service';

describe('WsconnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WsconnService = TestBed.get(WsconnService);
    expect(service).toBeTruthy();
  });
});
