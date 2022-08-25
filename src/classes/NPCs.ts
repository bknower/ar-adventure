import { NPC } from "./NPC";

export class Aoun extends NPC {
  messages = [
    { m: "I am Joseph Aoun" },
    { m: "I'm here to give you the most unfathomable dome of all time" },
    { m: "Are you ready?", responses: ["Yes", "No"] },
  ];
  index = 0;
  constructor() {
    super("Aoun", "Aoun is our daddy.");
  }

  hasMsg(): boolean {
    return true;
  }

  answer(msg: string): void {}

  getMsg(): string {
    return this.messages[this.index].m;
  }

  getResponses(): string[] | undefined {
    return this.messages[this.index].responses;
  }
}
