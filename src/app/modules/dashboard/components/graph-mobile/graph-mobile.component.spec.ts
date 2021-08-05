import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphMobileComponent } from './graph-mobile.component';

describe('GraphMobileComponent', () => {
  let component: GraphMobileComponent;
  let fixture: ComponentFixture<GraphMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
