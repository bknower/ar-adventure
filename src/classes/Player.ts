import { Item } from "./Item";
import { Place } from "./Place";

export class Player {
  inventory: Item[] = [];
  place: Place;
  constructor(place: Place) {
    this.place = place;
  }
}
