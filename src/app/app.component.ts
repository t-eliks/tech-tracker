import { Component } from "@angular/core";
import { Coordinates } from "./types/coordinates.type";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "tech-tracker";

  car_number: string;

  currentCoordinates: Coordinates = { lat: 0, lng: 0 };

  onCarNumberEntered(car_number: string) {
    this.car_number = car_number;
  }

  onLocationPicked(point: Coordinates) {
    this.currentCoordinates.lat = point.lat;
    this.currentCoordinates.lng = point.lng;
  }
}
