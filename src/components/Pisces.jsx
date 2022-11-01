import React, { useEffect, useRef, useState, useCallback } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
// import { RestoreIcon, FavoriteIcon, LocationOnIcon } from "@mui/icons-material";
import BookIcon from "@mui/icons-material/LibraryBooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BackpackIcon from "@mui/icons-material/Backpack";
import PlaceIcon from "@mui/icons-material/Place";
import { Game } from "../classes/Game";
import Map from "./Map";
import Inventory from "./Inventory";
import L, { LatLng } from "leaflet";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Place } from "../classes/Place";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { ItemList } from "./ItemList";
import { Item } from "../classes/Item";
import { NPC } from "../classes/NPC";
import { isEqual } from "lodash";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import MessageModal from "./MessageModal";
import { Messages } from "../classes/Messages";
import Room from "./Room";
import DialogueTree from "react-dialogue-tree";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { Aoun, Paws } from "../classes/NPCs";
import { Shield, Sword } from "../classes/Items";
import { GenerateGameState } from "./GenerateGame";

export function Pisces({
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
}) {
  console.log("pisces");
  useEffect(() => {
    class Shield extends Droppable {
      constructor(dropped) {
        super(
          "Shield",
          "A shield",
          {
            defend: () => {
              addToInventory(new Shield(false));
            },
            attack: () => {
              console.log("You bash the enemy with your shield!");
            },
          },
          dropped
        );
      }
    }
    const Sword = new Droppable("Sword", "A sword", {
      attack: () => {
        console.log("You swing your sword at the enemy!");
      },
    });

    class FishMan extends NPC {
      ready = false;
      messages = [
        {
          m: "I am a fish",
        },
        {
          m: "I am a fishn'ts",
          cond: () => {
            return inventory.some((i) => i.name === "IVFish");
          },
        },
      ];
      constructor() {
        super(
          "FishMan",
          "FishMan.",
          "https://upload.wikimedia.org/wikipedia/commons/8/88/Joseph_Aoun_%282897155178%29_%28cropped%29.jpg"
        );
      }
    }

    const IVFish = new Droppable(
      "Fish",
      "A fish",
      {},
      true,
      "https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/66/2020/04/Jordanella_floridae_Plate_TZSR14b_24_50mm_2.jpg"
    );

    tempPlaces["IV"] = new Place(
      "IV",
      "",
      L.latLng([42.33551679180333, -71.08902096748353]),
      () => {},
      [IVFish]
    );

    class Aoun extends NPC {
      ready = false;
      messages = [
        {
          m: "I am Joseph Aoun",
        },
        {
          m: "I'm here to give you the most unfathomable dome of all time",
          cond: () => {
            return this.timesTalkedTo === 1;
          },
        },
        {
          m: "**loud slurping sounds**",
          cond: () => this.ready,
        },
        {
          m: "Are you ready?",
          cond: () => this.timesTalkedTo > 1,
          input: (answer) => {
            console.log("answer", answer);
            if (answer === "yes") {
              this.ready = true;
            }
          },
        },
      ];
      constructor() {
        super(
          "Aoun",
          "Aoun is our daddy.",
          "https://upload.wikimedia.org/wikipedia/commons/8/88/Joseph_Aoun_%282897155178%29_%28cropped%29.jpg"
        );
      }
    }

    const Paws = new NPC(
      "Paws",
      "A big old husky",
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/Paws%2C_Northeastern_Mascot.jpg",
      [{ m: "I hate you" }]
    );

    tempPlaces["ISEC"] = new Place(
      "ISEC",
      "It's ISEC",
      L.latLng([42.33783257291951, -71.08726143836977]),
      () => {},
      [Sword, new Shield()],
      [new Aoun(), Paws]
    );
    setPlayerPlace(tempPlaces["ISEC"]);
  }, []);
}
