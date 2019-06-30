import { Component, ViewChild, Input } from "@angular/core";
import { MapComponent } from "../map/map.component";
import { Coordinates } from "../types/coordinates.type";

const DISTANCE_MODIFIER = 0.1;
const ANIMATION_INTERVAL = 1000;
const DEFAULT_FORMATTED_TIME = "00:00";

@Component({
  selector: "app-tech-tracker-page",
  templateUrl: "./tech-tracker-page.component.html",
  styleUrls: ["./tech-tracker-page.component.css"]
})
export class TechTrackerPageComponent {
  @Input("longitude") lng: number;
  @Input("latitude") lat: number;

  formattedArrivalTime: string;

  @ViewChild(MapComponent, { static: false }) map: MapComponent;

  onMapInitialized() {
    this.map
      .animateRouteToCurrentPosition(
        this.generateRandomPoint(
          { lat: this.lat, lng: this.lng },
          DISTANCE_MODIFIER
        ),
        ANIMATION_INTERVAL
      )
      .then(estimatedMilliseconds => {
        this.setFormattedEstimatedArrivalTime(
          new Date(new Date().getTime() + estimatedMilliseconds)
        );
      });
  }

  private setFormattedEstimatedArrivalTime(arrivalTime: Date) {
    if (arrivalTime) {
      this.formattedArrivalTime = `${this.addZero(
        arrivalTime.getHours()
      )}:${this.addZero(arrivalTime.getMinutes())}`;
    } else {
      this.formattedArrivalTime = DEFAULT_FORMATTED_TIME;
    }
  }

  private addZero(number: number): string {
    return `${number < 10 ? `0${number}` : number}`;
  }

  private generateRandomPoint(
    relativePoint: Coordinates,
    distanceModifier: number
  ): Coordinates {
    const randomizeSign = number => {
      return Math.random() >= 0.5 ? number * -1 : number;
    };

    let lat, lng;

    lat = lng = Math.random() * distanceModifier;

    lat = randomizeSign(lat);
    lng = randomizeSign(lng);

    lat += relativePoint.lat;
    lng += relativePoint.lng;

    return { lat, lng };
  }
}
