import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapViewMainComponent } from './map-view-main.component';

describe('MapViewMainComponent', () => {
  let component: MapViewMainComponent;
  let fixture: ComponentFixture<MapViewMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapViewMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapViewMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
