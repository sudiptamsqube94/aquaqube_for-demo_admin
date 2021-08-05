import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorMobileComponent } from './sensor-mobile.component';

describe('SensorMobileComponent', () => {
  let component: SensorMobileComponent;
  let fixture: ComponentFixture<SensorMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
