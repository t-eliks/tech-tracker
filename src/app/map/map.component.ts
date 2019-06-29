import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MouseEvent } from "@agm/core";
import {} from "googlemaps";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  lat = 0;
  lng = 0;

  markerLat: number;
  markerLng: number;

  @Input() isMarkerDraggable = false;
  @Output() markerMoved = new EventEmitter<{ lng: number; lat: number }>();

  private map: google.maps.Map;

  constructor() {}

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;

        this.markerLat = this.lat;
        this.markerLng = this.lng;
      });
    }
  }

  onMapReady(map: google.maps.Map) {
    this.map = map;
  }

  onMarkerMoved($event: MouseEvent) {
    this.markerLat = $event.coords.lat;
    this.markerLng = $event.coords.lng;

    this.markerMoved.emit({ lat: this.markerLat, lng: this.markerLng });
  }
}
