import { Entity } from "./Entity";
import { Item } from "./Item";
import L, { LatLng } from "leaflet";

export class Place extends Entity {
  items: Item[];
  location: LatLng | null;
  constructor(name: string, description: string, location?: LatLng) {
    super(name, description);
    this.items = [];
    this.location = location ? location : null;
  }
}
