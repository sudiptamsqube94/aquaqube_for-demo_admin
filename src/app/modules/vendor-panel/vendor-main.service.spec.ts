import { TestBed } from '@angular/core/testing';

import { VendorMainService } from './vendor-main.service';

describe('VendorMainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendorMainService = TestBed.get(VendorMainService);
    expect(service).toBeTruthy();
  });
});
