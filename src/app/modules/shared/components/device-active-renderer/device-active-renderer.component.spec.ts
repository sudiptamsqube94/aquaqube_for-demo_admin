import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceActiveRendererComponent } from './device-active-renderer.component';

describe('DeviceActiveRendererComponent', () => {
  let component: DeviceActiveRendererComponent;
  let fixture: ComponentFixture<DeviceActiveRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceActiveRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceActiveRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
