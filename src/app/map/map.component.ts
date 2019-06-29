import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MouseEvent } from "@agm/core";
import {} from "googlemaps";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  @Input("latitude") lat = 0;
  @Input("longitude") lng = 0;

  @Input("markerLatitude") markerLat = 0;
  @Input("markerLongitude") markerLng = 0;

  @Input() isMarkerDraggable = false;
  @Output() markerMoved = new EventEmitter<{ lng: number; lat: number }>();

  private map: google.maps.Map;

  constructor() {}

  ngOnInit() {}

  onMapReady(map: google.maps.Map) {
    this.map = map;
  }

  onMarkerMoved($event: MouseEvent) {
    this.markerLat = $event.coords.lat;
    this.markerLng = $event.coords.lng;

    this.markerMoved.emit({ lat: this.markerLat, lng: this.markerLng });
  }
}
