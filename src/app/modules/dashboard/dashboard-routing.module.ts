import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DashboardMainComponent } from "./pages/dashboard-main/dashboard-main.component";
import { MobileDashboardMainComponent } from "./pages/mobile-dashboard-main/mobile-dashboard-main.component";
import { MobileLocationsComponent } from "./components/mobile-locations/mobile-locations.component";
import { MobileDevicesComponent } from "./components/mobile-devices/mobile-devices.component";
import { MobileNotificationsComponent } from "./components/mobile-notifications/mobile-notifications.component";
import { MobileContactComponent } from "./components/mobile-contact/mobile-contact.component";
import { MobileProfileComponent } from "./components/mobile-profile/mobile-profile.component";
import { BranchDevicesComponent } from "./components/branch-devices/branch-devices.component";
import { GraphMainComponent } from "./components/graph-main/graph-main.component";
import { NotificationDetailsComponent } from "./components/notification-details/notification-details.component";
import { MapViewMainComponent } from "./pages/map-view-main/map-view-main.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardMainComponent },
  { path: "map-view", component: MapViewMainComponent },
  { path: "mobile-dashboard", component: MobileDashboardMainComponent },
  { path: "mobile-locations", component: MobileLocationsComponent },
  { path: "mobile-devices", component: MobileDevicesComponent },
  { path: "mobile-notifications", component: MobileNotificationsComponent },
  { path: "mobile-contact", component: MobileContactComponent },
  { path: "mobile-profile", component: MobileProfileComponent },
  { path: "mobile-devices-branches", component: BranchDevicesComponent },
  { path: "mobile-graphs", component: GraphMainComponent },
  {
    path: "mobile-devices-notification",
    component: NotificationDetailsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
