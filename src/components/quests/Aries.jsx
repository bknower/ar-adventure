import React, { useEffect, useRef, useState, useCallback } from "react";
import L, { LatLng } from "leaflet";
import { Place } from "../../classes/Place";
import { NPC } from "../../classes/NPC";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { withVar } from "../UI";
import {
  SignalCellularConnectedNoInternet0BarOutlined,
  ThirtyFpsSelect,
} from "@mui/icons-material";
export function Aries({
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
  // put everything in here and then add this to the list of children in
  // QuestWrapper in UI.jsx

  const offMessage =
    "Someone must have forgotten this when they were swimming.";

  const waitTime = 10;
  class Stopwatch extends Droppable {
    active = false;
    time = waitTime;
    stayedInPortal = true;
    interval;

    constructor() {
      super(
        "Stopwatch",
        offMessage,
        {
          use: () => {
            if (this.active) {
              this.active = false;
              this.description = offMessage;
              clearInterval(this.interval);
              this.time = waitTime;
              return "You reset the stopwatch.";
            } else {
              this.active = true;
              this.interval = setInterval(() => {
                this.time--;
                let onMessage =
                  offMessage +
                  " It reads: " +
                  Math.floor(this.time / 60) +
                  ":" +
                  ("00" + (this.time % 60)).slice(-2);
                if (this.time <= 0) {
                  clearInterval(this.interval);
                  onMessage =
                    "\nAfter a long wait, you saw a single word appear behind the portal: determination.";
                }
                this.description = onMessage;
                if (this.dropped) {
                  setPlaces((places) => {
                    return { ...places };
                  });
                } else {
                  setInventory((i) => [...i]);
                }
              }, 1000);
              const onMessage =
                offMessage +
                " It reads: " +
                Math.floor(this.time / 60) +
                ":" +
                ("00" + (this.time % 60)).slice(-2);
              this.description = onMessage;
              return "You start the stopwatch.";
            }
          },
        },
        true,
        "https://m.media-amazon.com/images/I/61xXvNuGqzL._AC_SL1500_.jpg"
      );
    }
  }
  useEffect(() => {
    places["Barletta Natatorium"].items.push(new Stopwatch());
  }, []);
}
