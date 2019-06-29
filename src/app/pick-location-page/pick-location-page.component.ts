import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-pick-location-page",
  templateUrl: "./pick-location-page.component.html",
  styleUrls: ["./pick-location-page.component.css"]
})
export class PickLocationPageComponent implements OnInit {
  currentLat = 0;
  currentLng = 0;

  @Output() locationPicked = new EventEmitter<{ lat: number; lng: number }>();

  constructor() {}

  ngOnInit() {}

  onMarkerMoved(markerCoordinates: { lat: number; lng: number }) {
    this.currentLat = markerCoordinates.lat;
    this.currentLng = markerCoordinates.lng;
  }

  onContinueClicked() {
    this.locationPicked.emit({ lat: this.currentLat, lng: this.currentLng });
  }
}
