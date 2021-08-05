import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentDetialComponent } from './assignment-detial.component';

describe('AssignmentDetialComponent', () => {
  let component: AssignmentDetialComponent;
  let fixture: ComponentFixture<AssignmentDetialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentDetialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
