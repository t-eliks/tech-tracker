import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-car-identification-page",
  templateUrl: "./car-identification-page.component.html",
  styleUrls: ["./car-identification-page.component.css"]
})
export class CarIdentificationPageComponent {
  car_number = "";

  @Output() carNumberEntered = new EventEmitter<string>();

  onSubmit() {
    this.carNumberEntered.emit(this.car_number);
  }
}
