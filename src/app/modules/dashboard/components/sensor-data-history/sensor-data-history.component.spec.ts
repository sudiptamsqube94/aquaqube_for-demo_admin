import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDataHistoryComponent } from './sensor-data-history.component';

describe('SensorDataHistoryComponent', () => {
  let component: SensorDataHistoryComponent;
  let fixture: ComponentFixture<SensorDataHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorDataHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorDataHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
