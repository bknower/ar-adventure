import React, { useEffect, useRef, useState, useCallback } from "react";
import L, { LatLng } from "leaflet";
import { Place } from "../../classes/Place";
import { NPC } from "../../classes/NPC";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { withVar } from "../UI";
import { Item } from "../../classes/Item";
export function Gemini({
  places,
  setPlaces,
  inventory,
  setInventory,
  playerPlace,
  setPlayerPlace,
  playerLocation,
  setPlayerLocation,
  // Droppable,
  tempPlaces,
  addToInventory,
  removeFromInventory,
  addToPlace,
  removeFromPlace,
}) {
  // class DroppableI extends Item {
  //   dropped;
  //   constructor(
  //     addToInventory,
  //     addToPlace,
  //     removeFromInventory,
  //     removeFromPlace,
  //     name,
  //     description,
  //     actions = {},
  //     dropped = true,
  //     url = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/1920px-Question_mark_%28black%29.svg.png"
  //   ) {
  //     super(name, description, actions, url);
  //     this.dropped = dropped;
  //     const drop = () => {
  //       addToPlace(removeFromInventory(this));
  //       this.dropped = true;
  //       this.actions["pick up"] = pickUp;
  //       delete this.actions["drop"];
  //     };
  //     const pickUp = () => {
  //       addToInventory(removeFromPlace(this));
  //       this.dropped = false;
  //       this.actions["drop"] = drop;
  //       delete this.actions["pick up"];
  //     };
  //     if (dropped) {
  //       this.actions["pick up"] = pickUp;
  //     } else {
  //       this.actions["drop"] = drop;
  //     }
  //   }
  // }

  // const Droppable = DroppableI.bind(
  //   null,
  //   addToInventory,
  //   addToPlace,
  //   removeFromInventory,
  //   removeFromPlace
  // );
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
              playerPlace.name === "Mugar Life Sciences" &&
              !places["Mugar Life Sciences"].npcs.some(
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
    "The instruction manual said that it can be used to read the brainwaves of a subject, but that it's very fragile and will turn off if moved around. It's currently turned on.";
  const offMessage =
    "The instruction manual said that it can be used to read the brainwaves of a subject, but that it's very fragile and will turn off if moved around. It's currently turned off.";
  // class CerebralScanner extends Droppable {
  //   active = false;

  //   constructor() {
  //     super(
  //       "Cerebral Scanner",
  //       offMessage,
  //       {
  //         use: () => {
  //           if (this.active) {
  //             this.active = false;
  //             this.description = offMessage;
  //             return "You turn off the scanner.";
  //           } else {
  //             this.active = true;
  //             this.description = onMessage;
  //             return "You turn on the scanner.";
  //           }
  //         },
  //       },
  //       true,
  //       "https://cdna.artstation.com/p/assets/images/images/029/191/042/large/yuri-isachenko-scan-version-new.jpg?1596731952"
  //     );
  //   }
  // }

  useEffect(() => {
    places["Matthews Arena"].npcs = [new Dog()];
    places["Hayden Hall"].npcs = [new ProfessorGurdon()];
    places["ISEC"].items.push(new CerebralScanner());
    console.log("test");
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
