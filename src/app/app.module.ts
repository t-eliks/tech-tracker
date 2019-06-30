import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CarIdentificationPageComponent } from "./car-identification-page/car-identification-page.component";
import { PickLocationPageComponent } from "./pick-location-page/pick-location-page.component";
import { MapComponent } from "./map/map.component";

import { AgmCoreModule } from "@agm/core";
import { TechTrackerPageComponent } from "./tech-tracker-page/tech-tracker-page.component";
@NgModule({
  declarations: [
    AppComponent,
    CarIdentificationPageComponent,
    MapComponent,
    PickLocationPageComponent,
    TechTrackerPageComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBqT_Nvr67nTnJYPYJ5x97Ian-jS68-tf4"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
