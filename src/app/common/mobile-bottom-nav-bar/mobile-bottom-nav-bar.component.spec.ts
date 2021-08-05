import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBottomNavBarComponent } from './mobile-bottom-nav-bar.component';

describe('MobileBottomNavBarComponent', () => {
  let component: MobileBottomNavBarComponent;
  let fixture: ComponentFixture<MobileBottomNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileBottomNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBottomNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
