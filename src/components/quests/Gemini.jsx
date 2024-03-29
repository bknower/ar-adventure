import React, { useEffect, useRef, useState, useCallback } from "react";
import L, { LatLng } from "leaflet";
import { Place } from "../../classes/Place";
import { NPC } from "../../classes/NPC";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { withVar } from "../UI";
export function Gemini({
  places,
  setPlaces,
  inventory,
  setInventory,
  playerPlace,
  setPlayerPlace,
  playerLocation,
  setPlayerLocation,
  Droppable,
  tempPlaces,
  addToInventory,
  removeFromInventory,
  addToPlace,
  removeFromPlace,
}) {
  class Bernard extends NPC {
    messages = [
      {
        m: "Wow, I can't believe you found me! I was stuck in there for so long.",
      },
      {
        m: "That guy was about to clone me -- I know it would be cool to have another brainy husky running around, but I saw what happened to his other subjects **shudders**!",
        cond: () => this.timesTalkedTo === 1,
      },
      {
        m: "People don't realize that even though I'm a dog, I'm still a person!",
        cond: () => this.timesTalkedTo === 2,
      },
      {
        m: "I'm not sure why, but I feel compelled to tell you this word: facsimile",
        cond: () => this.timesTalkedTo === 3,
      },
      {
        m: "Thanks again for your help!",
        cond: () => this.timesTalkedTo > 3,
      },
    ];
    constructor() {
      super(
        "Bernard the Brainy Husky",
        "He looks rather frazzled.",
        "https://cdn.discordapp.com/attachments/982733598195068978/1032748922420076675/IMG_0157.jpg"
      );
    }
  }

  const magicWhistle = new Droppable(
    "Magic Whistle",
    "The dog's magic whistle",
    {
      use: () =>
        withVar(setPlaces, (places) =>
          withVar(setPlayerPlace, (playerPlace) => {
            if (
              playerPlace === "Mugar Life Sciences" &&
              !places[playerPlace].npcs.some(
                (i) => i.name === "Bernard the Brainy Husky"
              )
            ) {
              places["Mugar Life Sciences"].npcs.push(new Bernard());
              return "You blow the whistle and Bernard appears in front of you!";
            } else return "You blow the whistle, but nothing happens.";
          })
        ),
    },
    false,
    "https://cdn.vadasabi.com/images/steppes/old/366376.jpg"
  );
  class Dog extends NPC {
    messages = [
      {
        m: "*bark*",
      },
      {
        m: "Have you seen my friend Bernard? I'm worried about him.",
        cond: () => this.timesTalkedTo === 1,
      },
      {
        m: "Normally, I would recall him with my magic whistle, but I have to be within 15 meters of him for it to work.",
        cond: () => this.timesTalkedTo === 2,
      },
      {
        m: "Maybe you can find him for me -- take this whistle. The last time I saw him, he was heading to his class in Hayden",
        cond: () => {
          if (this.timesTalkedTo === 3) {
            addToInventory(magicWhistle);
            return true;
          }
          return false;
        },
      },
      {
        m: "Did you find him?",
        cond: () => this.timesTalkedTo > 3,
      },
    ];
    constructor() {
      super(
        "Dog",
        "The dog is skittering across the ice, pushing the puck around with its nose.",
        "https://content.sportslogos.net/logos/33/783/full/8542_northeastern_huskies-alternate-2007.png"
      );
    }
  }

  class ProfessorGurdon extends NPC {
    messages = [
      {
        m: "Can I help you?",
      },
      {
        m: `Sorry, I've got to get back to my research

        CEREBRAL SCANNER READING: I hope no one stumbles upon my nefarious plot -- my experiments are almost complete! If someone were to visit the wrong part of Mugar, I would be done for.`,
        cond: () =>
          withVar(setInventory, (inventory) => {
            let index = inventory.findIndex(
              (item) => item.name === "Cerebral Scanner"
            );
            return index !== -1 && inventory[index].active;
          }),
      },
      {
        m: "Sorry, I've got to get back to my research",
        cond: () => this.timesTalkedTo >= 1,
      },
    ];
    constructor() {
      super(
        "Professor Gurdon",
        "The professor smiles knowingly at you.",
        "https://i0.wp.com/www.oxfordstudent.com/wp-content/uploads/2019/10/3910607056_b80645b516_o.jpg?fit=531%2C531&ssl=1"
      );
    }
  }

  const onMessage =
    "The manual said that it can be used to read someone's brain waves, and it will turn off if moved around. It's currently turned on.";
  const offMessage =
    "The manual said that it can be used to read someone's brain waves, and it will turn off if moved around. It's currently turned off.";
  class CerebralScanner extends Droppable {
    active = false;

    constructor() {
      super(
        "Cerebral Scanner",
        offMessage,
        {
          use: () => {
            if (this.active) {
              this.active = false;
              this.description = offMessage;
              return "You turn off the scanner.";
            } else {
              this.active = true;
              this.description = onMessage;
              return "You turn on the scanner.";
            }
          },
        },
        true,
        "https://cdna.artstation.com/p/assets/images/images/029/191/042/large/yuri-isachenko-scan-version-new.jpg?1596731952"
      );
    }
  }

  useEffect(() => {
    places["Matthews Arena"].npcs = [new Dog()];
    places["Hayden Hall"].npcs = [new ProfessorGurdon()];
    places["ISEC"].items.push(new CerebralScanner());
  }, []);
  useEffect(() => {
    if (inventory.some((item) => item.name === "Cerebral Scanner")) {
      let index = inventory.findIndex(
        (item) => item.name === "Cerebral Scanner"
      );
      inventory[index].active = false;
      inventory[index].description = offMessage;
      setInventory((x) => [...x]);
    }
  }, [playerPlace]);
}
