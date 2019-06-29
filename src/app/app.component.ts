import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "tech-tracker";

  car_number = "";

  currentLat = 0;
  currentLng = 0;

  onCarNumberEntered(car_number: string) {
    this.car_number = car_number;
  }

  onLocationPicked(point: { lat: number; lng: number }) {
    this.currentLat = point.lat;
    this.currentLng = point.lng;
  }
}
