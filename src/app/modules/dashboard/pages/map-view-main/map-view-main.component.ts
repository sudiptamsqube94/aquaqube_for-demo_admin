import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Router } from "@angular/router";
import { MapComponent, SourceVectorComponent } from "ngx-openlayers";
import * as ol from "openlayers";
import { interval, Observable } from "rxjs";
import { startWith, takeWhile, switchMap } from "rxjs/operators";
import { BridgeHistoryComponent } from "../../components/bridge-history/bridge-history.component";
import { DashbordMainService } from "../../dashbord-main.service";
import { Nodes } from "../../model/customerDashboard";

@Component({
  selector: "app-map-view-main",
  templateUrl: "./map-view-main.component.html",
  styleUrls: ["./map-view-main.component.scss"],
})
export class MapViewMainComponent implements OnInit, AfterViewInit, OnDestroy {
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
  checked: boolean = false;
  graphPopup: MatDialogRef<BridgeHistoryComponent>;
  lengths: number= 0
  constructor(private dashbordmainService: DashbordMainService,  private router: Router,    private dialog: MatDialog,) {
    this.displayTooltip = this.displayTooltip.bind(this);
  }
  ngOnDestroy(){
    this.componentActive= false
  }

  ngAfterViewInit(){
    var tooltip = document.getElementById("tooltip");
    this.map.instance.addOverlay(
      new ol.Overlay({
        element: tooltip,
        offset: [10, 0],
        positioning: "bottom-left",
        id: "tooltip",
      })
    )
    this.map.instance.on("pointermove", this.displayTooltip);
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
    this.pollingData$.subscribe((data) => {
      if(!!data){
        this.lengths = data.length - 1;
        this.ontripFeatures = [];
        this.accidentFeatures = [];
        if (!!data && data.length > 0) {
          var centerLongitudeLatitude = ol.proj.fromLonLat([
            +data[0].node_longitude,
            +data[0].node_latitude,
          ]);
          this.map.instance.setView(
            new ol.View({
              center: centerLongitudeLatitude,
              zoom: 10,
            })
          );
          data.forEach(element=> {
            if(!!element.node_latitude && !!element.node_longitude){
              var addMarker = ol.proj.fromLonLat([
                +(+element.node_longitude),
                +(+element.node_latitude),
              ]);
              var SensorTitle = ""
              element.sensors.forEach((e, index)=> {
                  SensorTitle= SensorTitle +e.sensor_type_name + " : <b>" +e.current_reading+"</b><br>"
              })
              var feature = new ol.Feature({
                geometry: new ol.geom.Point(addMarker),
                name: "NODE: " + element.uid,
                Sensor1: SensorTitle,
              });
              feature.setId(element.uid);
              feature.setProperties([{ router: this.router }]);
              if 
                (!!element.sensors.find(m=> (m.current_reading < m.sensor_threshold_min) || (m.current_reading > m.sensor_threshold_max))
              ) {
                console.log(element.sensors.find(m=> (m.current_reading < m.sensor_threshold_min) || (m.current_reading > m.sensor_threshold_max)));
                
                this.accidentFeatures.push(feature);  
                console.log("acc", this.accidentFeatures);
                     
              } else {
                this.ontripFeatures.push(feature)
                console.log("on", this.ontripFeatures);
                
              }
            }
          })
          this.onTripMarkersSource.instance.clear();
          this.accidentMarkersSource.instance.clear();
          console.log(this.accidentMarkersSource);
          
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
  // mapOnClick(evt) {
  //       const map = evt.map;
  //       const point = map.forEachFeatureAtPixel(
  //         evt.pixel,
  //         function (feature, layer) {
  //           console.log(feature);
            
  //           if (
  //             !!feature.getProperties() &&
  //             !!feature.getProperties()[0] &&
  //             !!feature.getId() &&
  //             !!feature.get("charge")
  //           ) {
  //             // feature
  //             //   .getProperties()[0]
  //             //   .router.navigate(
  //             //     ["dashboard", "asset-details", feature.getId()],
  //             //     { queryParams: { id: null } }
  //             //   );
  //             console.log("call");
              
  //           } 
  //         }
  //       );
  // }
  cardClick(data:Nodes){
    var centerLongitudeLatitude = ol.proj.fromLonLat([
      +data.node_longitude,
      +data.node_latitude,
    ]);
    this.map.instance.setView(
      new ol.View({
        center: centerLongitudeLatitude,
        zoom: 11,
      })
    );
  }
  history(data: Nodes,toggle){
    if (toggle == true) {
      this.checked = true;
      this.graphPopup = this.dialog.open(BridgeHistoryComponent, {
        data: {
          node_uid: data.uid,
          sensor_type: null
        },
        width: "90%",
        disableClose: true,
      });
      this.graphPopup.afterClosed().subscribe((result) => {
        if (result) {
          console.log("call");
          
          this.checked = false;
        }
      });
    }
  }
  mapview(){
    this.router.navigate(["dashboard"]);
  }

}
