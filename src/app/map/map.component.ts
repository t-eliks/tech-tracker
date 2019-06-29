import { Component, OnInit } from "@angular/core";
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper } from "@agm/core";
import {} from "googlemaps";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  lat: number;
  lng: number;

  markerLat: number;
  markerLng: number;

  isMarkerDraggable = false;

  private map: google.maps.Map;

  constructor() {}

  ngOnInit() {}

  onMapReady(map: google.maps.Map) {
    this.map = map;
  }
}
