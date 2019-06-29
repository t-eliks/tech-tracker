import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-car-id",
  templateUrl: "./car-id.component.html",
  styleUrls: ["./car-id.component.css"]
})
export class CarIdComponent implements OnInit {
  car_number = "";

  constructor() {}

  ngOnInit() {}

  onClickContinue() {
    console.log(this.car_number);
  }
}
