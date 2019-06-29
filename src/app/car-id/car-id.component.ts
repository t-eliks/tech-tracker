import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-car-id",
  templateUrl: "./car-id.component.html",
  styleUrls: ["./car-id.component.css"]
})
export class CarIdComponent implements OnInit {
  car_number = "";

  @Output() carNumberEntered = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onClickContinue() {
    this.carNumberEntered.emit(this.car_number);
  }
}
