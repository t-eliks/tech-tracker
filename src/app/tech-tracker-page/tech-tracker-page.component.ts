import { Component, OnInit, ViewChild, Input, Output } from "@angular/core";
import { MapComponent } from "../map/map.component";

@Component({
  selector: "app-tech-tracker-page",
  templateUrl: "./tech-tracker-page.component.html",
  styleUrls: ["./tech-tracker-page.component.css"]
})
export class TechTrackerPageComponent implements OnInit {
  @Input("longitude") lng: number;
  @Input("latitude") lat: number;

  @Output() formattedArrivalTime: string;

  @ViewChild(MapComponent, { static: false }) map: MapComponent;

  constructor() {}

  ngOnInit() {}

  onMapInitialized() {
    this.map
      .animateRouteToCurrentPosition(
        {
          lat: this.lat - Math.random() / 10,
          lng: this.lng - Math.random() / 10
        },
        1000
      )
      .then(estimatedMilliseconds => {
        this.setFormattedEstimatedArrivalTime(
          new Date(new Date().getTime() + estimatedMilliseconds)
        );
      });
  }

  private setFormattedEstimatedArrivalTime(arrivalTime: Date) {
    if (arrivalTime) {
      const hours = arrivalTime.getHours();
      const minutes = arrivalTime.getMinutes();
      this.formattedArrivalTime = `${this.addZero(hours)}:${this.addZero(
        minutes
      )}`;
    } else this.formattedArrivalTime = "00:00";
  }

  private addZero(number: number): string {
    return `${number < 0 ? `0${number}` : number}`;
  }
}
