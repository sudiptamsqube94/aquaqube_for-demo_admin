import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeArrayComponent } from './node-array.component';

describe('NodeArrayComponent', () => {
  let component: NodeArrayComponent;
  let fixture: ComponentFixture<NodeArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
