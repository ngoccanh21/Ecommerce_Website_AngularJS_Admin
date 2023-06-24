import { TestBed } from '@angular/core/testing';

import { CthdbService } from './cthdb.service';

describe('CthdbService', () => {
  let service: CthdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CthdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
