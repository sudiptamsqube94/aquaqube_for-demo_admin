import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPinGraphComponent } from './all-pin-graph.component';

describe('AllPinGraphComponent', () => {
  let component: AllPinGraphComponent;
  let fixture: ComponentFixture<AllPinGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPinGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPinGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
