import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeRendererComponent } from './date-time-renderer.component';

describe('DateTimeRendererComponent', () => {
  let component: DateTimeRendererComponent;
  let fixture: ComponentFixture<DateTimeRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimeRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
