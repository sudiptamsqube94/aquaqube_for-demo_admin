import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardMainComponent } from "./pages/dashboard-main/dashboard-main.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { GraphComponent } from "./components/graph/graph.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { CustomerBranchDetailsComponent } from "./components/customer-branch-details/customer-branch-details.component";
import { CustomerBranchDeviceDetailsComponent } from "./components/customer-branch-device-details/customer-branch-device-details.component";
import { MaterialModule } from "src/app/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { VideoWindowComponent } from "./components/video-window/video-window.component";
import { DeviceListComponent } from "./components/device-list/device-list.component";
import { SensorCardComponent } from "./components/sensor-card/sensor-card.component";
import { ViewPinGraphComponent } from "./components/view-pin-graph/view-pin-graph.component";
import { PinViewSensorCardComponent } from "./components/pin-view-sensor-card/pin-view-sensor-card.component";
import { AllPinGraphComponent } from "./components/all-pin-graph/all-pin-graph.component";
import { MobileDashboardMainComponent } from "./pages/mobile-dashboard-main/mobile-dashboard-main.component";
import { MobileBottomNavBarComponent } from "src/app/common/mobile-bottom-nav-bar/mobile-bottom-nav-bar.component";
import { MobileTopNavBarComponent } from "src/app/common/mobile-top-nav-bar/mobile-top-nav-bar.component";
import { MobileLocationsComponent } from "./components/mobile-locations/mobile-locations.component";
import { MobileDevicesComponent } from "./components/mobile-devices/mobile-devices.component";
import { MobileNotificationsComponent } from "./components/mobile-notifications/mobile-notifications.component";
import { MobileContactComponent } from "./components/mobile-contact/mobile-contact.component";
import { MobileProfileComponent } from "./components/mobile-profile/mobile-profile.component";
import { BranchDevicesComponent } from "./components/branch-devices/branch-devices.component";
import { NodeComponent } from "./node/node.component";
import { GraphMainComponent } from "./components/graph-main/graph-main.component";
import { NotificationDetailsComponent } from "./components/notification-details/notification-details.component";
import { SensorMobileComponent } from "./components/sensor-mobile/sensor-mobile.component";
import { GraphMobileComponent } from "./components/graph-mobile/graph-mobile.component";
import { GraphPinComponent } from "./components/graph-pin/graph-pin.component";
import { hammerjs } from "hammerjs";
import { SensorDataHistoryComponent } from "./components/sensor-data-history/sensor-data-history.component";
import { MapViewMainComponent } from "./pages/map-view-main/map-view-main.component";
import { AngularOpenlayersModule } from "ngx-openlayers";

@NgModule({
  declarations: [
    DashboardMainComponent,
    GraphComponent,
    CustomerBranchDetailsComponent,
    CustomerBranchDeviceDetailsComponent,
    VideoWindowComponent,
    DeviceListComponent,
    SensorCardComponent,
    ViewPinGraphComponent,
    PinViewSensorCardComponent,
    AllPinGraphComponent,
    MobileDashboardMainComponent,
    MobileLocationsComponent,
    MobileDevicesComponent,
    MobileNotificationsComponent,
    MobileContactComponent,
    MobileProfileComponent,
    NodeComponent,
    BranchDevicesComponent,
    GraphMainComponent,
    NotificationDetailsComponent,
    SensorMobileComponent,
    GraphMobileComponent,
    GraphPinComponent,
    SensorDataHistoryComponent,
    MapViewMainComponent,
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    DashboardRoutingModule,
    MaterialModule,
    SharedModule,
    AngularOpenlayersModule,
  ],
  entryComponents: [VideoWindowComponent, GraphComponent],
})
export class DashboardModule {}
