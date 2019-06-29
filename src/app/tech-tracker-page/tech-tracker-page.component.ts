import { Component, AfterViewInit, ViewChild, Input } from "@angular/core";
import { MapComponent } from "../map/map.component";

@Component({
  selector: "app-tech-tracker-page",
  templateUrl: "./tech-tracker-page.component.html",
  styleUrls: ["./tech-tracker-page.component.css"]
})
export class TechTrackerPageComponent implements AfterViewInit {
  @Input("longitude") lng: number;
  @Input("latitude") lat: number;

  @ViewChild(MapComponent, { static: false }) map: MapComponent;

  constructor() {}

  ngAfterViewInit() {}

  onMapInitialized() {
    this.map.setRouteToCurrentPosition({
      lat: this.lat - Math.random() / 50,
      lng: this.lng - Math.random() / 50
    });
    this.map.animateRoute();
  }
}
