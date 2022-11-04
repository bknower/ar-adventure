import React, { useEffect, useRef, useState, useCallback } from "react";
import L, { LatLng } from "leaflet";
import { Place } from "../../classes/Place";
import { NPC } from "../../classes/NPC";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { withVar } from "../UI";
export function Capricorn({
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
  const time = 450;
  const visited = useRef([]);
  class Goat extends NPC {
    timeTaken = 0;
    interval;
    finished = false;
    messages = [
      {
        m: "Hello, traveller!",
      },
      {
        m: "I've heard tell that America runs to Dunkin'. If you can prove it to me, I've got a reward for you.",
        cond: () => this.timesTalkedTo === 1,
      },
      {
        m:
          `Visit the other two Dunkin' locations
        on campus within the next ` +
          time / 60 +
          ` minutes and return to me as fast as you can. Your time starts now!
        `,
        cond: () => {
          if (this.timesTalkedTo === 2) {
            this.interval = setInterval(() => {
              this.timeTaken++;
              this.description = `He looks quite fast. He says that ${
                Math.floor(this.timeTaken / 60) +
                ":" +
                ("00" + (this.timeTaken % 60)).slice(-2)
              } has passed.`;
              setPlaces((x) => {
                return { ...x };
              });
            }, 1000);
            return true;
          }
          return false;
        },
      },
      {
        m: "Great job! I can't believe you made it in time!",
        cond: () => {
          if (
            !this.finished &&
            this.timesTalkedTo >= 3 &&
            this.timeTaken < time &&
            ["Shillman Dunkin'", "Ruggles Dunkin'"].every((place) =>
              visited.current.includes(place)
            )
          ) {
            this.finished = true;
            clearInterval(this.interval);
            return true;
          }

          return false;
        },
      },
      {
        m: "This fascinating word will be your reward: nimblefooted",
        cond: () => this.finished,
      },
      {
        m: "You're too slow! I'm not giving you a reward, unless you can prove you can do it faster.",
        cond: () => {
          if (this.timeTaken >= time) {
            this.timeTaken = 0;
            clearInterval(this.interval);
            visited.current = [];
            this.timesTalkedTo = 1;
            setPlaces((x) => {
              return { ...x };
            });
            return true;
          }
          return false;
        },
      },
      {
        m: "Good luck!",
        cond: () => this.timesTalkedTo >= 3 && this.timeTaken < time,
      },
    ];
    constructor() {
      super(
        "Goat",
        "He looks quite fast.",
        "https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg"
      );
    }
  }
  useEffect(() => {
    visited.current.push(playerPlace);
  }, [playerPlace]);
  useEffect(() => {
    places["Richards Dunkin'"].npcs.push(new Goat());
  }, []);
}
