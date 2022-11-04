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
  class Arrow extends Droppable {
    timesSharpened = 0;

    constructor() {
      super("Arrow", "The archer asked you to sharpen this.", {
        use: () => {
          if (this.timesSharpened < 50) {
            this.timesSharpened++;
            return "You sharpen the arrow.";
          } else {
            return "It seems pretty sharp tbh.";
          }
        },
        false,
        "https://dbdchmu23h7zg.cloudfront.net/fit-in/1200x610/posts/argusnews-arrow-attack-argus-news-8ddd1cb4-5e20-4694-a0e7-37b496dccd51.jpg"
      });
    }
  }
  class Archer extends NPC {
    messages = [
      {
        m: "My arrow has gone dull. Can you help me?",
      },
      {
        m: "Take this and sharpen it for me at least 50 times, then drop it for me.",
        cond: () => {
          if (this.timesTalkedTo === 1) {
            addToInventory(new Arrow());
          }
        },
      },
      {
        m: "Please, I need this arrow.",
        cond: () => withVar(setPlaces, places => {
            return !roomContainsItem(places["Hunter Statue"], "Arrow");
        }
            }
      }
      
    ];
    constructor() {
      super(
        "Professor Gurdon",
        "The professor smiles knowingly at you.",
        "https://jeteye.pixyblog.com/wp-content/uploads/sites/5/2013/11/001-123201.jpg"
      );
    }
  }
  useEffect(() => {
    console.log("test");
  }, []);
}
