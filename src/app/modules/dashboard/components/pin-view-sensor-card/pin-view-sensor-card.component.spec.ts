import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinViewSensorCardComponent } from './pin-view-sensor-card.component';

describe('PinViewSensorCardComponent', () => {
  let component: PinViewSensorCardComponent;
  let fixture: ComponentFixture<PinViewSensorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinViewSensorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinViewSensorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
