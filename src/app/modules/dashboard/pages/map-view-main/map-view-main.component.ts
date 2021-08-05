import { Component, OnInit, ViewChild } from "@angular/core";
import { MapComponent } from "ngx-openlayers";
import * as ol from "openlayers";
import { interval, Observable } from "rxjs";
import { startWith, takeWhile, switchMap } from "rxjs/operators";
import { DashbordMainService } from "../../dashbord-main.service";

@Component({
  selector: "app-map-view-main",
  templateUrl: "./map-view-main.component.html",
  styleUrls: ["./map-view-main.component.scss"],
})
export class MapViewMainComponent implements OnInit {
  @ViewChild("fullScreen", { static: false }) divRef: any;
  public zoom = 11;
  @ViewChild("map", { static: false }) map: MapComponent;
  componentActive: boolean;
  pollingData$: Observable<Node[]>;
  constructor(private dashbordmainService: DashbordMainService) {}

  ngOnInit() {
    this.componentActive = true;
    this.pollingData$ = interval(10000).pipe(
      startWith(0),
      takeWhile(() => this.componentActive),
      switchMap(() => {
        console.log("Polling Data");
        return this.dashbordmainService.getMapData();
      })
    );
    this.pollingData$.subscribe((data) => {
      console.log(data);
    });
  }
}
