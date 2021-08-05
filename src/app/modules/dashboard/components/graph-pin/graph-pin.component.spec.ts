import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPinComponent } from './graph-pin.component';

describe('GraphPinComponent', () => {
  let component: GraphPinComponent;
  let fixture: ComponentFixture<GraphPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
