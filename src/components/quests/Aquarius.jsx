import React, { useEffect, useRef, useState, useCallback } from "react";
import L, { LatLng } from "leaflet";
import { Place } from "../../classes/Place";
import { NPC } from "../../classes/NPC";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { withVar } from "../UI";
import { Item } from "../../classes/Item";
export function Aquarius({
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
  const elkay = new Item(
    "Elkay EZH2O Bottle Filling Station",
    "A water fountain.",
    {
      use: () => {
        if (
          roomContainsItem(
            "Curry Student Center",
            "Elkay EZH2O Bottle Filling Station"
          )
        ) {
          return "You fill your water bottle.";
        } else {
          return "You don't have anything to fill.";
        }
      },
    },
    "https://api.ferguson.com/dar-step-service/Query?ASSET_ID=6187203&USE_TYPE=ATG_PRIMARY_STANDARD_IMAGE&PRODUCT_ID=5111583&dARImageVersion=08052022115559"
  );
  useEffect(() => {
    places["Curry Student Center"].items.push(elkay);
  }, []);
}
