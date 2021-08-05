import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileTopNavBarComponent } from './mobile-top-nav-bar.component';

describe('MobileTopNavBarComponent', () => {
  let component: MobileTopNavBarComponent;
  let fixture: ComponentFixture<MobileTopNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileTopNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileTopNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
