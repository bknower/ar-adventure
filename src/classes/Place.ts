import { Entity } from "./Entity";
import { Item } from "./Item";
import { NPC } from "./NPC";
import L, { LatLng } from "leaflet";

export class Place extends Entity {
  items: Item[];
  npcs: NPC[];
  location: LatLng | null;
  onEnter: (...args: any[]) => any = () => {};
  constructor(
    name: string,
    description: string,
    location?: LatLng,
    onEnter: (...args: any[]) => any = () => {},
    items: Item[] = [],
    npcs: NPC[] = []
  ) {
    super(name, description);
    this.items = items;
    this.npcs = npcs;
    this.location = location ? location : null;
    this.onEnter = onEnter;
  }
}
