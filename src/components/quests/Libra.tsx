import React, { useEffect, useRef, useState, useCallback } from "react";
import L, { LatLng } from "leaflet";
import { Place } from "../../classes/Place";
import { NPC } from "../../classes/NPC";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { withVar } from "../UI";

export function Libra({
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
    let convStage = 0;
    class Mingus extends NPC {
        messages = [
            {
                m: "ayo?",
            },
            {
                m: "MESSAGE 1.1!",
                cond: () => convStage == 0,
            },
            {
                m: "MESSAGE 2.1!",
                cond: () => convStage == 1 && this.timesTalkedTo == 0,
            },
            {
                m: "MESSAGE 2.2!",
                cond: () => convStage == 1 && this.timesTalkedTo == 1,
            },
            {
                m: "MESSAGE 2.3!",
                cond: () => {
                    if (convStage == 1 && this.timesTalkedTo >= 2) {
                        convStage = 2;
                        this.timesTalkedTo = 0; // set in other NPC?
                        return true;
                    }
                    return false;
                }
            },
            {
                m: "MESSAGE 3.1!",
                cond: () => convStage == 2,
            },
            {
                m: "MESSAGE 4.1!",
                cond: () => convStage == 3 && this.timesTalkedTo == 0,
            },
            {
                m: "MESSAGE 4.2!",
                cond: () => convStage == 3 && this.timesTalkedTo == 1,
            },
            {
                m: "MESSAGE 4.3!",
                cond: () => {
                    if (convStage == 3 && this.timesTalkedTo >= 2) {
                        convStage = 4;
                        this.timesTalkedTo = 0;
                        return true;
                    }
                    return false;
                }
            },
            {
                m: "MESSAGE 5.1!",
                cond: () => convStage == 4, // about to be moved via the hamper
            },
        ];
        constructor() {
            super(
                "Mingus the Jazz Cat",
                "Boxing with his fears.",
                "https://www.berklee.edu/sites/default/files/styles/scale_to_480px_width/public/2022-01/Use%20for%20Web%20and%20Presentation-397A9108.jpeg?fv=LV4RuLYJ&itok=U_K0MEKv"
            );
        }
    }

    class Paws extends NPC {
        messages = [
            {
                m: "ayo?",
            },
            {
                m: "MESSAGE 1.1!",
                cond: () => convStage == 0 && this.timesTalkedTo == 0,
            },
            {
                m: "MESSAGE 1.2!",
                cond: () => convStage == 0 && this.timesTalkedTo == 1,
            },
            {
                m: "MESSAGE 1.3!",
                cond: () => {
                    if (convStage == 0 && this.timesTalkedTo >= 2) {
                        addToInventory(loveLetter);
                        convStage = 1;
                        this.timesTalkedTo = 0;
                        return true;
                    }
                    return false;
                }
            },
            {
                m: "MESSAGE 2.1!",
                cond: () => convStage == 1,
            },
            {
                m: "MESSAGE 3.1!",
                cond: () => convStage == 2 && this.timesTalkedTo == 0,
            },
            {
                m: "MESSAGE 3.2!",
                cond: () => convStage == 2 && this.timesTalkedTo == 1,
            },
            {
                m: "MESSAGE 3.3!",
                cond: () => {
                    if (convStage == 2 && this.timesTalkedTo >= 2) {
                        convStage = 3;
                        this.timesTalkedTo = 0;
                        return true;
                    }
                    return false;
                }
            },
            {
                m: "MESSAGE 4.1!",
                cond: () => convStage == 3,
            },
            {
                m: "MESSAGE 5.1!",
                cond: () => convStage == 4 && this.timesTalkedTo == 0,
            },
            {
                m: "MESSAGE 5.2!",
                cond: () => convStage == 4 && this.timesTalkedTo == 1,
            },
            {
                m: "MESSAGE 5.3!",
                cond: () => {
                    if (convStage == 4 && this.timesTalkedTo >= 2) {
                        places["Squashbusters"].addToPlace(hamper);
                        convStage = 5;
                        this.timesTalkedTo = 0;
                        return true;
                    }
                    return false;
                }
            },
        ];
        constructor() {
            super(
                "Paws the Husky",
                "Dodging as many Ells as he can.",
                "https://pbs.twimg.com/media/CBIz3lnUIAARnoa?format=jpg&name=4096x4096"
            );
        }
    }

    const loveLetter = new Droppable(
        "Love Letter",
        "A message of forbidden love",
        {
          use: () =>
            withVar(setPlaces, (places) =>
              withVar(setPlayerPlace, (playerPlace) => {
                return ""; // TODO
              })
            ),
        },
        false,
        "https://images-ext-1.discordapp.net/external/0Ied3y_vH3T3NPOb61OQWbxdW15QhBLbCx0Obvn7AmY/https/cdn140.picsart.com/310195452182211.png"
      );

      const hamper = new Droppable(
        "Hamper",
        "A container of future forbidden contents",
        {
          use: () =>
            withVar(setPlaces, (places) =>
              withVar(setPlayerPlace, (playerPlace) => {
                return ""; // TODO
              })
            ),
        },
        false,
        "https://images-ext-2.discordapp.net/external/9TRYwTCT6f1x5O_KkdeF2DiRRGJXkt5Ckb1NfSFPBmc/https/www.texontowel.com/wp-content/uploads/Dandux-Basket-Truck-Gray-Glosstex-700x649.jpg"
      );

    useEffect(() => {
        places["Speare"].npcs.push(new Mingus());
        places["Dodge Hall"].npcs.push(new Paws());
    }, []);
}
