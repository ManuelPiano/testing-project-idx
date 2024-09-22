import { TestBed } from '@angular/core/testing';

import { APIConnService } from './apiconn.service';

describe('APIConnService', () => {
  let service: APIConnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIConnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
