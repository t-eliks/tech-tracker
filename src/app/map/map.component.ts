import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MouseEvent, MapsAPILoader } from "@agm/core";
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

  @Output() mapInitialized = new EventEmitter<{}>();
  @Output() markerMoved = new EventEmitter<{ lng: number; lat: number }>();

  private map: google.maps.Map;
  private route: { lat: number; lng: number }[] = [];

  constructor(private mapsApiLoader: MapsAPILoader) {}

  ngOnInit() {}

  onMapReady(map: google.maps.Map) {
    this.map = map;
    this.mapInitialized.emit({});
  }

  onMarkerMoved($event: MouseEvent) {
    this.markerLat = $event.coords.lat;
    this.markerLng = $event.coords.lng;

    this.markerMoved.emit({ lat: this.markerLat, lng: this.markerLng });
  }

  setRouteToCurrentPosition(startPoint: { lat: number; lng: number }) {
    this.mapsApiLoader.load().then(() => {
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
          result.routes[0].overview_path.forEach(point => {
            this.route.push({ lat: point.lat(), lng: point.lng() });
          });
        }
      });
    });
  }

  animateRoute() {
    if (this.route) {
      let i = 0;
      const animationInterval = setInterval(() => {
        if (this.route.length === i + 1) clearInterval(animationInterval);
        this.markerLat = this.route[i].lat;
        this.markerLng = this.route[i].lng;
        this.lat = this.route[i].lat;
        this.lng = this.route[i].lng;
        i++;
      }, 100);
    }
  }
}
