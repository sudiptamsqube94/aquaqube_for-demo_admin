import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPinGraphComponent } from './view-pin-graph.component';

describe('ViewPinGraphComponent', () => {
  let component: ViewPinGraphComponent;
  let fixture: ComponentFixture<ViewPinGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPinGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPinGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
