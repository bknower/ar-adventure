import React, { useEffect, useRef, useState, useCallback } from "react";
import L, { LatLng } from "leaflet";
import { Place } from "../classes/Place";
import { NPC } from "../classes/NPC";
import "react-dialogue-tree/dist/react-dialogue-tree.css";

export function Pisces({
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
  useEffect(() => {
    class Shield extends Droppable {
      constructor(dropped) {
        super(
          "Shield",
          "A shield",
          {
            defend: () => {
              addToInventory(new Shield(false));
            },
            attack: () => {
              console.log("You bash the enemy with your shield!");
            },
          },
          dropped
        );
      }
    }
    const Sword = new Droppable("Sword", "A sword", {
      attack: () => {
        console.log("You swing your sword at the enemy!");
      },
    });

    class FishMan extends NPC {
      ready = false;
      messages = [
        {
          m: "I am a fish",
        },
        {
          m: "you dropped a fish",
          cond: () => {
            let condition = false;
            setPlaces((places) => {
              condition = places["Koi Pond"].items.some(
                (item) => item.name === "Fish"
              );
              return places;
            });
            return condition;
          },
        },
        {
          m: "I am a fishn'ts",
          cond: () => {
            let condition = false;
            setInventory((inventory) => {
              condition = inventory.some((i) => i.name === "Fish");
              return inventory;
            });
            return condition;
          },
        },
      ];
      constructor() {
        super(
          "FishMan",
          "FishMan.",
          "https://4.bp.blogspot.com/-kH0GuqcfYDs/WvEBibsv2lI/AAAAAAAAA8U/hN6Y4N7KV00M6b3lOcTXU6AHpY9guzdtACLcBGAs/s1600/excitedkuota.png"
        );
      }
    }
    places["Koi Pond"].npcs = [new FishMan()];

    const IVFish = new Droppable(
      "Fish",
      "A fish",
      {},
      true,
      "https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/66/2020/04/Jordanella_floridae_Plate_TZSR14b_24_50mm_2.jpg"
    );

    places.IV.items = [IVFish];

    class Aoun extends NPC {
      ready = false;
      messages = [
        {
          m: "I am Joseph Aoun",
        },
        {
          m: "I'm here to give you the most unfathomable dome of all time",
          cond: () => {
            return this.timesTalkedTo === 1;
          },
        },
        {
          m: "**loud slurping sounds**",
          cond: () => this.ready,
        },
        {
          m: "Are you ready?",
          cond: () => this.timesTalkedTo > 1,
          input: (answer) => {
            console.log("answer", answer);
            if (answer === "yes") {
              this.ready = true;
            }
          },
        },
      ];
      constructor() {
        super(
          "Aoun",
          "Aoun is our daddy.",
          "https://upload.wikimedia.org/wikipedia/commons/8/88/Joseph_Aoun_%282897155178%29_%28cropped%29.jpg"
        );
      }
    }

    const Paws = new NPC(
      "Paws",
      "A big old husky",
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/Paws%2C_Northeastern_Mascot.jpg",
      [{ m: "I hate you" }]
    );
    places.ISEC = {
      ...places.ISEC,
      items: [Sword, new Shield()],
      npcs: [new Aoun(), Paws],
    };
  }, []);
}
