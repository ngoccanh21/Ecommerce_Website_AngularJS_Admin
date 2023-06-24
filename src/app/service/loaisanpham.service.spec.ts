import { TestBed } from '@angular/core/testing';

import { LoaisanphamService } from './loaisanpham.service';

describe('LoaisanphamService', () => {
  let service: LoaisanphamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaisanphamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
