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
  useEffect(() => {
    console.log("test");
  }, []);
}
