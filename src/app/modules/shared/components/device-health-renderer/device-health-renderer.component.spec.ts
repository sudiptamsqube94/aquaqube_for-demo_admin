import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceHealthRendererComponent } from './device-health-renderer.component';

describe('DeviceHealthRendererComponent', () => {
  let component: DeviceHealthRendererComponent;
  let fixture: ComponentFixture<DeviceHealthRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceHealthRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceHealthRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
