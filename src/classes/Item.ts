import { Entity } from "./Entity";

export class Item extends Entity {
  constructor(name: string, description: string) {
    super(name, description);
  }
}
