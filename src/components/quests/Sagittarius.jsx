import React, { useEffect, useRef, useState, useCallback } from "react";
import L, { LatLng } from "leaflet";
import { Place } from "../../classes/Place";
import { NPC } from "../../classes/NPC";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { withVar } from "../UI";
export function Sagittarius({
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
  const toSharpen = 50;
  class Arrow extends Droppable {
    timesSharpened = 0;

    constructor() {
      super(
        "Arrow",
        "The archer asked you to sharpen this.",
        {
          use: () => {
            if (this.timesSharpened < toSharpen) {
              this.timesSharpened++;
              return "You sharpen the arrow.";
            } else {
              return "It seems pretty sharp tbh.";
            }
          },
        },
        false,
        "https://dbdchmu23h7zg.cloudfront.net/fit-in/1200x610/posts/argusnews-arrow-attack-argus-news-8ddd1cb4-5e20-4694-a0e7-37b496dccd51.jpg"
      );
    }
  }
  class Archer extends NPC {
    finished = false;
    messages = [
      {
        m: "My arrow has gone dull. Can you help me?",
      },

      {
        m: "Take this and sharpen it for me at least 50 times, then drop it for me.",
        cond: () => {
          if (this.timesTalkedTo === 1) {
            addToInventory(new Arrow());
            return true;
          }
          return false;
        },
      },
      {
        m: "Take this word as thanks: precision.",
        cond: () => this.finished,
      },
      {
        m: "Thank you, adventurer. You have my gratitude.",
        cond: () => {
          if (
            withVar(setPlaces, (places) => {
              let index = places["Hunter Statue"].items.findIndex(
                (item) => item.name === "Arrow"
              );
              return (
                index !== -1 &&
                places["Hunter Statue"].items[index].timesSharpened >= toSharpen
              );
            })
          ) {
            this.finished = true;
            return true;
          }
          return false;
        },
      },
      {
        m: "Please, I need this arrow.",
        cond: () => !this.finished && this.timesTalkedTo >= 2,
      },
    ];
    constructor() {
      super(
        "Archer",
        "He seems focused on his target.",
        "https://jeteye.pixyblog.com/wp-content/uploads/sites/5/2013/11/001-123201.jpg"
      );
    }
  }
  useEffect(() => {
    places["Hunter Statue"].npcs.push(new Archer());
  }, []);
}
