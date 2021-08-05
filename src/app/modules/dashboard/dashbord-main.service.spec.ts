import { TestBed } from '@angular/core/testing';

import { DashbordMainService } from './dashbord-main.service';

describe('DashbordMainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashbordMainService = TestBed.get(DashbordMainService);
    expect(service).toBeTruthy();
  });
});
