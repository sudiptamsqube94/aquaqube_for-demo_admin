import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NullValueComponent } from './null-value.component';

describe('NullValueComponent', () => {
  let component: NullValueComponent;
  let fixture: ComponentFixture<NullValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NullValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NullValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
