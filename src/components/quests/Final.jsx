import React, { useEffect, useRef, useState, useCallback } from "react";
import L, { LatLng } from "leaflet";
import { Place } from "../../classes/Place";
import { NPC } from "../../classes/NPC";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { withVar } from "../UI";
export function QuestTemplate({
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
  class Cthulu extends NPC {
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
        "Cthulu",
        "The ancient beast towers over you.",
        "https://megapencil.co/wp-content/uploads/2021/06/CthulhuNrThreeSR.jpg"
      );
    }
  }
  useEffect(() => {
    console.log("test");
  }, []);
}
