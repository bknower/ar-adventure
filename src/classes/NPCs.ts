import { NPC } from "./NPC";

export class Aoun extends NPC {
  messages = [
    { m: "I am Joseph Aoun" },
    {
      m: "I'm here to give you the most unfathomable dome of all time",
      cond: () => {
        return true;
      },
    },
    { m: "Are you ready?" },
  ];
  index = 0;
  constructor() {
    super("Aoun", "Aoun is our daddy.");
  }
}
