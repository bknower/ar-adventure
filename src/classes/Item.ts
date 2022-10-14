import { Entity } from "./Entity";

export class Item extends Entity {
  url: string;
  constructor(
    name: string,
    description: string,
    actions = {},
    url = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/1920px-Question_mark_%28black%29.svg.png"
  ) {
    super(name, description);
    this.url = url;
    this.actions = actions;
    // this.actions["drop"] = () => {};
  }
}
