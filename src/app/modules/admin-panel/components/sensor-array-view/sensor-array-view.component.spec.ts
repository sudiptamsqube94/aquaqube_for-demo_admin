import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorArrayViewComponent } from './sensor-array-view.component';

describe('SensorArrayViewComponent', () => {
  let component: SensorArrayViewComponent;
  let fixture: ComponentFixture<SensorArrayViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorArrayViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorArrayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
