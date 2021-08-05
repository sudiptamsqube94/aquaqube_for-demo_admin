import { TestBed } from '@angular/core/testing';

import { VendorGuardService } from './vendor-guard.service';

describe('VendorGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendorGuardService = TestBed.get(VendorGuardService);
    expect(service).toBeTruthy();
  });
});
