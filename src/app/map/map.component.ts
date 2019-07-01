import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MouseEvent, MapsAPILoader } from "@agm/core";
import {} from "googlemaps"; //fix namespace not found error
import { Coordinates } from "../types/coordinates.type";

const DEFAULT_LAT = 0;
const DEFAULT_LNG = 0;

const DEFAULT_MARKER_LAT = 0;
const DEFAULT_MARKER_LNG = 0;

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent {
  @Input("latitude") lat = DEFAULT_LAT;
  @Input("longitude") lng = DEFAULT_LNG;

  @Input("markerLatitude") markerLat = DEFAULT_MARKER_LAT;
  @Input("markerLongitude") markerLng = DEFAULT_MARKER_LNG;

  @Input() isMarkerDraggable = false;

  @Output() mapInitialized = new EventEmitter();
  @Output() markerMoved = new EventEmitter<Coordinates>();

  private map: google.maps.Map;

  constructor(private mapsApiLoader: MapsAPILoader) {}

  onMapReady(map: google.maps.Map) {
    this.map = map;
    this.mapInitialized.emit();
  }

  onMarkerMoved($event: MouseEvent) {
    this.markerLat = $event.coords.lat;
    this.markerLng = $event.coords.lng;

    this.markerMoved.emit({ lat: this.markerLat, lng: this.markerLng });
  }

  animateRouteToCurrentPosition(
    startPoint: Coordinates,
    animationInterval: number
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      this.setRouteToCurrentPosition(startPoint)
        .then(route => {
          resolve(this.animateRoute(route, animationInterval));
        })
        .catch(() => {
          reject();
        });
    });
  }

  private setRouteToCurrentPosition(startPoint: {
    lat: number;
    lng: number;
  }): Promise<Coordinates[]> {
    return new Promise((resolve, reject) => {
      this.mapsApiLoader
        .load()
        .then(() => {
          const directionsService = new google.maps.DirectionsService();
          const directionsRenderer = new google.maps.DirectionsRenderer();

          directionsRenderer.setMap(this.map);

          const request = {
            origin: startPoint,
            destination: { lat: this.lat, lng: this.lng },
            travelMode: google.maps.TravelMode.DRIVING
          };

          directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(result);
              const route = [];

              result.routes[0].overview_path.forEach(point => {
                route.push({ lat: point.lat(), lng: point.lng() });
              });

              resolve(route);
            } else {
              reject();
            }
          });
        })
        .catch(() => {
          reject();
        });
    });
  }

  private animateRoute(
    route: Coordinates[],
    animationInverval: number
  ): number {
    if (route) {
      let i = 0;

      const animationInterval = setInterval(() => {
        if (route.length === i + 1) {
          clearInterval(animationInterval);
        }

        this.markerLat = route[i].lat;
        this.markerLng = route[i].lng;
        this.lat = route[i].lat;
        this.lng = route[i].lng;

        i++;
      }, animationInverval);

      return route.length * animationInverval;
    } else {
      return 0;
    }
  }
}
