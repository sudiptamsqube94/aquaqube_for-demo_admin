import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileDevicesComponent } from './mobile-devices.component';

describe('MobileDevicesComponent', () => {
  let component: MobileDevicesComponent;
  let fixture: ComponentFixture<MobileDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
