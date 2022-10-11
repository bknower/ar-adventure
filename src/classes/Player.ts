import L, { LatLng } from "leaflet";
import { Item } from "./Item";
import { Place } from "./Place";

export class Player {
  inventory: Item[] = [];
  place: Place;
  location: Number[] = [0, 0];
  constructor(place: Place) {
    this.place = place;
  }
}
