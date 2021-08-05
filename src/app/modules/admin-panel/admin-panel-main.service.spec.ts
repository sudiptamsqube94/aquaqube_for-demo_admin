import { TestBed } from '@angular/core/testing';

import { AdminPanelMainService } from './admin-panel-main.service';

describe('AdminPanelMainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminPanelMainService = TestBed.get(AdminPanelMainService);
    expect(service).toBeTruthy();
  });
});
