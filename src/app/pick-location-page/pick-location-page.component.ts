import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Coordinates } from "../types/coordinates.type";

@Component({
  selector: "app-pick-location-page",
  templateUrl: "./pick-location-page.component.html",
  styleUrls: ["./pick-location-page.component.css"]
})
export class PickLocationPageComponent implements OnInit {
  currentCoordinates: Coordinates = { lat: 0, lng: 0 };

  @Output() locationPicked = new EventEmitter<Coordinates>();

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.currentCoordinates.lat = pos.coords.latitude;
        this.currentCoordinates.lng = pos.coords.longitude;
      });
    }
  }

  onMarkerMoved(markerCoordinates: Coordinates) {
    this.currentCoordinates.lat = markerCoordinates.lat;
    this.currentCoordinates.lng = markerCoordinates.lng;
  }

  onContinueClicked() {
    this.locationPicked.emit({
      lat: this.currentCoordinates.lat,
      lng: this.currentCoordinates.lng
    });
  }
}
