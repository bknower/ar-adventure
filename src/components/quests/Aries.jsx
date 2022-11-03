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

  const waitTime = 300;
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
              this.stayedInPortal = true;
              this.interval = setInterval(() => {
                this.time--;
                if (
                  withVar(setPlayerPlace, (place) => place !== "SnEngineering")
                ) {
                  this.stayedInPortal = false;
                }
                let onMessage =
                  offMessage +
                  " It reads: " +
                  Math.floor(this.time / 60) +
                  ":" +
                  ("00" + (this.time % 60)).slice(-2);
                if (this.time <= 0) {
                  clearInterval(this.interval);
                  if (this.stayedInPortal) {
                    onMessage =
                      "\nAfter a long wait, you hear a strange sound coming from the portal. Something must have changed.";

                    let index = places["SnEngineering"].npcs.findIndex(
                      (npc) => npc.name === "Interdimensional Portal"
                    );
                    places["SnEngineering"].npcs[index].finished = true;
                  } else {
                    onMessage =
                      "\nAfter such a long wait, nothing happened. What a waste of time.";
                  }
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

  class Portal extends NPC {
    finished = false;
    messages = [
      {
        m: "You shout into the void. There is no response.",
      },
      {
        m: "You shout into the void. The void responds with a single word: determination.",
        cond: () => this.finished,
      },
    ];
    constructor() {
      super(
        "Interdimensional Portal",
        "It emanates otherworldly sounds.",
        "https://i.ytimg.com/vi/h27ugp3gzWI/maxresdefault.jpg"
      );
    }
  }
  useEffect(() => {
    places["Barletta Natatorium"].items.push(new Stopwatch());
    places["SnEngineering"].npcs.push(new Portal());
  }, []);
}
