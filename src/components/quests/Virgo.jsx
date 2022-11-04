import React, { useEffect, useRef, useState, useCallback } from "react";
import L, { LatLng } from "leaflet";
import { Place } from "../../classes/Place";
import { NPC } from "../../classes/NPC";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { roomContainsItem, withVar } from "../UI";
import { ConstructionRounded } from "@mui/icons-material";
export function Virgo({
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
  roomContainsItem,
  itemEvent,
  map,
  markers,
}) {
  const firstUpdate = useRef(true);

  const artList = new Droppable(
    "Art List",
    "A list of the maiden's favorite locations to paint.",
    {
      use: () =>
        " Curry, Stwest, Green Line, Meserve... And what shall I try next?",
    },
    true,
    "https://i.pinimg.com/474x/ae/2d/2f/ae2d2fdbac1cb79c6ce165bbd26afe39--scroll-tattoos-scroll-tattoo-for-men.jpg"
  );
  class Maiden extends NPC {
    satisfied = false;
    gaveList = false;
    messages = [
      {
        m: "You there!\n\nI hold two tools of enormous power, but they have been snatched right from my hands!\n\nDid you take them?\n\nNo? Still, one of you students must be at fault. If you value your life, bring my lightning bolt and paintbrush back to me at once.",
      },
      {
        m: "Thank you for showing me that the students of Husky Hunt Academy have hope. For your ardor and virtue, I wish to bestow you a word: meritorious.",
        cond: () => this.satisfied === true,
      },
      {
        m: "Thank you, child. Though you have helped me, one good deed is not enough to win over my trust for humanity. I’ve given you a list of places I visit for art inspiration. Prove yourself worthy by creating something that will benefit the world. Only then will I relinquish my anger.",
        cond: () => {
          if (
            this.timesTalkedTo >= 1 &&
            !this.gaveList &&
            withVar(setInventory, (inventory) => {
              let index = inventory.findIndex(
                (item) => item.name === "Paintbrush and Lightning"
              );
              return index !== -1;
            })
          ) {
            addToInventory(artList);
            this.gaveList = true;
            return true;
          }
          return false;
        },
      },
      // {
      //   m: withVar(setInventory, (inventory) => {
      //     let index = inventory.findIndex(
      //       (item) => item.name === "Paintbrush and Lightning"
      //     );

      //     if (index !== -1) {
      //       if (inventory[index].lastUsed == "Meserve Hall") {
      //         return "Maidens, synchronized: you think yourself sly for using my powers against me?! Foolish... Replenish yourself, and make me a new painting.";
      //       } else if (inventory[index].lastUsed == "Curry Student Center") {
      //         return "I do not consort with zombies! Replenish yourself, and make me a new painting.";
      //       } else if (inventory[index].lastUsed == "Green Line Stop") {
      //         this.satisfied = true;
      //         return "I am impressed with your foresight. How did you know that the train would stop? You think to yourself “I didn’t,” but you accept her praise.";
      //       } else if (inventory[index].lastUsed == "Stwest") {
      //         return "You smell sticky and sweet... Replenish yourself, and make me a new painting. ";
      //       }
      //     } else {
      //       return "Use the paintbrush to paint for me. I wrote all my favorite places in my art list.";
      //     }
      //   }),
      //   cond: () =>
      //     this.timesTalkedTo >= 1 &&
      //     withVar(setInventory, (inventory) => {
      //       let index = inventory.findIndex(
      //         (item) => item.name === "Paintbrush and Lightning"
      //       );
      //       return index !== -1;
      //     }),
      // },
      {
        m: "Maidens, synchronized: you think yourself sly for using my powers against me?! Foolish... Replenish yourself, and make me a new painting.",
        cond: () =>
          withVar(setInventory, (inventory) => {
            let index = inventory.findIndex(
              (item) => item.name === "Paintbrush and Lightning"
            );
            return index !== -1 && inventory[index].lastUsed === "Meserve Hall";
          }),
      },
      {
        m: "I do not consort with zombies! Replenish yourself, and make me a new painting.",
        cond: () =>
          withVar(setInventory, (inventory) => {
            let index = inventory.findIndex(
              (item) => item.name === "Paintbrush and Lightning"
            );
            return (
              index !== -1 &&
              inventory[index].lastUsed === "Curry Student Center"
            );
          }),
      },
      {
        m: "I am impressed with your foresight. How did you know that the train would stop? You think to yourself “I didn’t,” but you accept her praise.",
        cond: () =>
          withVar(setInventory, (inventory) => {
            let index = inventory.findIndex(
              (item) => item.name === "Paintbrush and Lightning"
            );
            if (
              index !== -1 &&
              inventory[index].lastUsed === "Green Line Stop"
            ) {
              this.satisfied = true;
              return true;
            }
            return false;
          }),
      },
      {
        m: "You smell sticky and sweet... Replenish yourself, and make me a new painting.",
        cond: () =>
          withVar(setInventory, (inventory) => {
            let index = inventory.findIndex(
              (item) => item.name === "Paintbrush and Lightning"
            );
            return index !== -1 && inventory[index].lastUsed === "Stwest";
          }),
      },
      {
        m: "Use the paintbrush to paint for me. I wrote all my favorite places in my art list.",
        cond: () => this.gaveList,
      },
      {
        m: "This is your only warning.",
        cond: () => this.timesTalkedTo >= 1,
      },
    ];
    constructor() {
      super(
        "Maiden",
        "She presides over the arboretum.",
        "https://i.imgur.com/VMFHutj.jpeg"
      );
    }
  }

  class Student extends NPC {
    messages = [
      {},
      {
        m: "Be careful near Meserve. The maiden is a wrathful diety.",
        cond: () => {
          console.log("Foo");
          return withVar(setPlaces, (places) => {
            return places["Meserve Hall"].npcs[0].timesTalkedTo === 0;
          });
        },
      },
      {
        m: "Is the maiden still angry?\n\nListen, I’m not a thief! She dropped her artifacts while she was sleeping!\n\nI'm a good samaritan, so I tried to return them to the art department... But you didn’t hear about it from me!",
        cond: () =>
          withVar(setPlaces, (places) => {
            return places["Meserve Hall"].npcs[0].timesTalkedTo >= 1;
          }),
      },
    ];
    constructor() {
      super(
        "Student",
        "A stressed out student. Why did I sign up for this?",
        "https://i.imgur.com/cDuu6bK.jpg"
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

  class MaidenArtifact extends Droppable {
    lastUsed = "";

    constructor() {
      super(
        "Paintbrush and Lightning",
        "The maiden's tools crackle with creative energy. You'd better be careful moving them around campus.",
        {
          use: () =>
            withVar(setPlaces, (places) => {
              return withVar(setPlayerPlace, (playerPlace) => {
                if (playerPlace === "Meserve Hall") {
                  this.lastUsed = "Meserve Hall";
                  return "The drawing rattles to life! A second maiden snaps into view, her face animated on the Centennial bricks!";
                } else if (playerPlace === "Curry Student Center") {
                  this.lastUsed = "Curry Student Center";
                  return "The drawing rattles to life! A swarm of Husky Hunt Academy students rise from the ground, devouring you, your teammates, and the rest of the school. You awaken again as a zombie and try to make the most out of your glum existence. You graduate from Husky Hunt Academy, get married, grow old, and do not die.";
                } else if (playerPlace === "Green Line Stop") {
                  this.lastUsed = "Green Line Stop";
                  return "The green line shakes and springs a second track out onto Huntington Ave. The train is barreling directly towards five students, pausing for traffic at each intersection. On the other track lies a single student (it's this guy you hate). Directly in front of you appears a lever – you sense that if you pull it, the train will divert to the other track, saving the business majors but killing that guy. You waste no time in deciding, and immediately pull the lever, leaving that guy to his fate. However, as soon as you turn around, the green line catches fire, stopping in its tracks and killing no one.";
                } else if (playerPlace === "Stwest") {
                  this.lastUsed = "Stwest";
                  return "A sickly sweet smell permeates through campus. It reminds you of the time your parents bought you cotton candy at the county fair. Or apple picking in the fall, taking a crisp bite and letting the juice trickle down your arm. The campus shines in a yellowish hue resembling the joy of your childhood. It shines too brightly, and, as you turn your head, the last thing you see is the flood of golden molasses outpacing you.";
                } else {
                  this.lastUsed = "";
                  return "The maiden's voice echoes... There's a time and a place for everything.";
                }
              });
            }),
        },
        true,
        "https://i.imgur.com/4SyveNv.png"
      );
    }
  }

  useEffect(() => {
    places["Meserve Hall"].npcs.push(new Maiden());
    places["Meserve Hall"].npcs.push(new Student());
    places["Ryder Hall"].items.push(new MaidenArtifact());
  }, []);
}
