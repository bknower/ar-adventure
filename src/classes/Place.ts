import { Entity } from "./Entity";
import { Item } from "./Item";
import L, { LatLng } from "leaflet";

export class Place extends Entity {
  items: Item[];
  location: LatLng | null;
  onEnter: (...args: any[]) => any = () => {};
  constructor(
    name: string,
    description: string,
    location?: LatLng,
    onEnter?: (...args: any[]) => any
  ) {
    super(name, description);
    this.items = [];
    this.location = location ? location : null;
    if (onEnter) {
      this.onEnter = onEnter;
    }
  }
}
