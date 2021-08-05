import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileLocationsComponent } from './mobile-locations.component';

describe('MobileLocationsComponent', () => {
  let component: MobileLocationsComponent;
  let fixture: ComponentFixture<MobileLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
