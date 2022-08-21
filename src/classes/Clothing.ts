import { Item } from "./Item";

export class Clothing extends Item {
  worn: boolean;
  constructor(name: string, description: string) {
    super(name, description);
    this.worn = false;
    this.actions["wear"] = () => {
      this.worn = true;
      console.log(`You put on ${this.name}.`);
    };
    this.actions["take off"] = () => {
      this.worn = false;
      console.log(`You take off ${this.name}.`);
    };
  }
}
