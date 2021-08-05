import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MapComponent, SourceVectorComponent } from "ngx-openlayers";
import * as ol from "openlayers";
import { interval, Observable } from "rxjs";
import { startWith, takeWhile, switchMap } from "rxjs/operators";
import { DashbordMainService } from "../../dashbord-main.service";
import { Nodes } from "../../model/customerDashboard";

@Component({
  selector: "app-map-view-main",
  templateUrl: "./map-view-main.component.html",
  styleUrls: ["./map-view-main.component.scss"],
})
export class MapViewMainComponent implements OnInit {
  @ViewChild("fullScreen", { static: false }) divRef: any;
  public zoom = 10;
  @ViewChild("map", { static: false }) map: MapComponent;
  componentActive: boolean;
  pollingData$: Observable<Nodes[]>;
  pollingData1$: Observable<Nodes[]>;
  ontripFeatures: ol.Feature[] = [];
  accidentFeatures: ol.Feature[] = [];
  @ViewChild("onTripMarkersSource", { static: false })
  onTripMarkersSource: SourceVectorComponent;
  @ViewChild("accidentMarkersSource", { static: false })
  accidentMarkersSource: SourceVectorComponent;
  constructor(private dashbordmainService: DashbordMainService,  private router: Router,) {
    this.displayTooltip = this.displayTooltip.bind(this);
  }

  ngOnInit() {
    this.componentActive = true;
    this.pollingData$ = interval(20000).pipe(
      startWith(0),
      takeWhile(() => this.componentActive),
      switchMap(() => {
        console.log("Polling Data");
        return this.dashbordmainService.getMapData();
      })
    );
    this.pollingData1$= this.pollingData$
    var tooltip = document.getElementById("tooltip");
    this.pollingData1$.subscribe((data) => {
      if(!!data){
        this.map.instance.on("pointermove", this.displayTooltip);
        this.map.instance.addOverlay(
          new ol.Overlay({
            element: tooltip,
            offset: [5, 0],
            positioning: "bottom-left",
            id: "tooltip",
          })
        )
        this.ontripFeatures = [];
        this.accidentFeatures = [];
        if (!!data && data.length > 0) {
          var centerLongitudeLatitude = ol.proj.fromLonLat([
            +data[0].node_latitude,
            +data[0].node_longitude,
          ]);
          this.map.instance.setView(
            new ol.View({
              center: centerLongitudeLatitude,
              zoom: 15,
            })
          );
          data.forEach(element=> {
            var addMarker = ol.proj.fromLonLat([
              +(+element.node_longitude),
              +(+element.node_longitude),
            ]);
            var SensorTitle = ""
            element.sensors.forEach((e, index)=> {
                SensorTitle= SensorTitle +e.sensor_name + ":" + e.current_reading +"<br>"
            })
            var feature = new ol.Feature({
              geometry: new ol.geom.Point(addMarker),
              name: "NODE: " + element.uid,
              Sensor1: SensorTitle,
            });
            feature.setId(element.uid);
              feature.setProperties([{ router: this.router }]);
            if 
              (!!element.sensors.find(m=> m.current_reading < m.sensor_threshold_min || m.current_reading < m.sensor_threshold_max)
            ) {
              this.accidentFeatures.push(feature);
            } else {
              this.ontripFeatures.push(feature)
            }
          })
          this.onTripMarkersSource.instance.clear();
          this.accidentMarkersSource.instance.clear();
          if (!!this.ontripFeatures) {
            this.onTripMarkersSource.instance.addFeatures(
              this.ontripFeatures
            );
          }
          if (!!this.accidentFeatures) {
            this.accidentMarkersSource.instance.addFeatures(
              this.accidentFeatures
            );
          }
        }
      }
    },
    (error) => {
      console.log(error);
    })
  }
  displayTooltip(evt) {
    var tooltip = document.getElementById("tooltip");
    var evTooltip = document.getElementById("ev-tooltip");
    var pixel = evt.pixel;
    var feature = this.map.instance.forEachFeatureAtPixel(
      pixel,
      function (feature) {
        if (!!feature.get("name")) {
          return feature;
        }
      }
    );
    if (!!feature && !!feature.get("Sensor1")) {
      tooltip.style.display = feature ? "" : "none";
      if (feature) {
        this.map.instance.getOverlayById("tooltip").setPosition(evt.coordinate);
        tooltip.firstElementChild.innerHTML = feature.get("name");
          tooltip.lastElementChild.innerHTML =
            feature.get("Sensor1")
      }
    } 

  }
}
