import React, { useEffect, useRef, useState, useCallback } from "react";
import L, { LatLng } from "leaflet";
import { Place } from "../../classes/Place";
import { NPC } from "../../classes/NPC";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { roomContainsItem, withVar } from "../UI";
export function Leo({
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
}) {
  class LakeGhost extends NPC {
    messages = [
      {
        m: "You must be brave to challenge me, adventurer!",
      },
      {
        m: "Pah! How's this going to keep me warm?",
        cond: () =>
          withVar(setPlaces, (places) => places["Lake Hall"].finished),
      },
      {
        m: "Bring me something to keep me warm, and I might just let you live.",
        cond: () => this.timesTalkedTo >= 1,
      },
    ];
    constructor() {
      super(
        "The Ghost of Lake Hall",
        "Very spooky.",
        "https://cdn.discordapp.com/attachments/982733598195068978/1032748922420076675/IMG_0157.jpg"
      );
    }
  }

  const blanket = new Droppable(
    "Blanket",
    "It looks warm and fuzzy",
    {},
    true,
    "https://cdn.vadasabi.com/images/steppes/old/366376.jpg"
  );
  const greekFire = new Droppable(
    "Greek Fire",
    "It burns with a bright green flame",
    {},
    true,
    "https://cdn.vadasabi.com/images/steppes/old/366376.jpg"
  );
  const bonfire = new Droppable(
    "Bonfire",
    "The logs inside it crackle.",
    {},
    true,
    "https://cdn.vadasabi.com/images/steppes/old/366376.jpg"
  );

  useEffect(() => {
    places["Lake Hall"].npcs.push(new LakeGhost());
    places["Willis Hall"].items.push(...[blanket, bonfire, greekFire]);
  }, []);
  useEffect(() => {
    console.log("places changed", roomContainsItem("Lake Hall", "Greek Fire"));
    if (
      roomContainsItem("Lake Hall", "Greek Fire") //&&
      //   roomContainsItem("Nightingale Hall", "Beetle") &&
      //   roomContainsItem("Holmes Hall", "Pipe")
    ) {
      console.log("Lake Hall finished");
      setPlaces((places) => {
        places["Lake Hall"].finished = true;
        return { ...places };
      });
    }
  }, [itemEvent]);
}
