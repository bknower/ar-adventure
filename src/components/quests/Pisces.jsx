import React, { useEffect, useRef, useState, useCallback } from "react";
import L, { LatLng } from "leaflet";
import { Place } from "../../classes/Place";
import { NPC } from "../../classes/NPC";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { withVar } from "../UI";

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
  removeFromInventory,
  addToPlace,
  removeFromPlace,
}) {
  const Sword = new Droppable("Sword", "A sword", {
    attack: () => {
      console.log("You swing your sword at the enemy!");
    },
  });

  class FishMan extends NPC {
    found = false;
    messages = [
      {
        m: "Have you seen my children?",
      },
      {
        m: "Oh my, you found them! Thank you so much!",
        cond: () =>
          !this.found &&
          withVar(setPlaces, (places) => {
            const fishList = [
              "IV",
              "Barletta",
              "Steast",
              "Stwest",
              "the fountain",
              "Centennial",
              "Krentzman",
            ];
            if (
              fishList.every((fish) =>
                places["Koi Pond"].items.some(
                  (item) => item.name === "Fish from " + fish
                )
              )
            ) {
              this.found = true;
              this.timesTalkedTo = 0;
              return true;
            }
            return false;
          }),
      },
      {
        m: "This word seems very important to me: antediluvian.",
        cond: () => this.timesTalkedTo === 0 && this.found,
      },
      {
        m: "I'm so glad you found my children!",
        cond: () => this.timesTalkedTo >= 1 && this.found,
      },
    ];
    constructor() {
      super(
        "Fish Man",
        "Fish Man.",
        "https://4.bp.blogspot.com/-kH0GuqcfYDs/WvEBibsv2lI/AAAAAAAAA8U/hN6Y4N7KV00M6b3lOcTXU6AHpY9guzdtACLcBGAs/s1600/excitedkuota.png"
      );
    }
  }
  const IVFish = new Droppable(
    "Fish from IV",
    "It flops around wetly",
    {},
    true,
    "https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/66/2020/04/Jordanella_floridae_Plate_TZSR14b_24_50mm_2.jpg"
  );

  const CabotFish = new Droppable(
    "Fish from Barletta",
    "It flops around wetly",
    {},
    true,
    "https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/66/2020/04/Jordanella_floridae_Plate_TZSR14b_24_50mm_2.jpg"
  );

  const SteastFish = new Droppable(
    "Fish from Steast",
    "It flops around wetly",
    {},
    true,
    "https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/66/2020/04/Jordanella_floridae_Plate_TZSR14b_24_50mm_2.jpg"
  );

  const StwestFish = new Droppable(
    "Fish from Stwest",
    "It flops around wetly",
    {},
    true,
    "https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/66/2020/04/Jordanella_floridae_Plate_TZSR14b_24_50mm_2.jpg"
  );

  const FountainFish = new Droppable(
    "Fish from the fountain",
    "It flops around wetly",
    {},
    true,
    "https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/66/2020/04/Jordanella_floridae_Plate_TZSR14b_24_50mm_2.jpg"
  );

  const CentennialFish = new Droppable(
    "Fish from Centennial",
    "It flops around wetly",
    {},
    true,
    "https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/66/2020/04/Jordanella_floridae_Plate_TZSR14b_24_50mm_2.jpg"
  );

  const KrentzmanFish = new Droppable(
    "Fish from Krentzman",
    "It flops around wetly",
    {},
    true,
    "https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/66/2020/04/Jordanella_floridae_Plate_TZSR14b_24_50mm_2.jpg"
  );

  useEffect(() => {
    places["Koi Pond"].npcs = [new FishMan()];

    places.IV.items.push(IVFish);
    places["Barletta Natatorium"].items.push(CabotFish);
    places["Steast"].items.push(SteastFish);
    places["Stwest"].items.push(StwestFish);
    places["Raytheon Amphitheater"].items.push(FountainFish);
    places["Centennial"].items.push(CentennialFish);
    places["Krentzman Quad"].items.push(KrentzmanFish);

    places.ISEC = {
      ...places.ISEC,
      items: [],
      npcs: [],
    };
  }, []);
}
