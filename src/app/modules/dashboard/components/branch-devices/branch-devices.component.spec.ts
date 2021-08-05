import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchDevicesComponent } from './branch-devices.component';

describe('BranchDevicesComponent', () => {
  let component: BranchDevicesComponent;
  let fixture: ComponentFixture<BranchDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
