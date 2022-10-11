import { NPC } from "./NPC";

// finds the first message in the list with a true condition
// if none, returns the first message

export class Aoun extends NPC {
  messages = [
    {
      m: "I am Joseph Aoun",
    },
    {
      m: "I'm here to give you the most unfathomable dome of all time",
      cond: () => {
        return this.timesTalkedTo > 0;
      },
    },
    { m: "Are you ready?" },
  ];
  index = 0;
  constructor() {
    super(
      "Aoun",
      "Aoun is our daddy.",
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Joseph_Aoun_%282897155178%29_%28cropped%29.jpg"
    );
  }
}

export const Paws = new NPC(
  "Paws",
  "A big old husky",
  "https://upload.wikimedia.org/wikipedia/commons/6/6a/Paws%2C_Northeastern_Mascot.jpg",
  [{ m: "I hate you" }]
);
