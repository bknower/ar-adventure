import React, { useEffect, useRef, useState, useCallback } from "react";
import L, { LatLng } from "leaflet";
import { Place } from "../../classes/Place";
import { NPC } from "../../classes/NPC";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { withVar } from "../UI";
import { Item } from "../../classes/Item";
import { skeletonClasses } from "@mui/material";
export function Final({
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
  class Guidebook extends Droppable {
    timesUsed = 0;
    /**
     *     passwords = {
      lion: "valor",
      ram: "determination",
      crab: "resilience",
      bull: "fortitude",
      twins: "facsimile",
      maiden: "purity",
      scales: "justice",
      scorpion: "passion",
      archer: "adventure",
      goat: "nimblefooted",
      waterbearer: "friendship",
      fish: "antediluvian",
    };
     */
    messages = [
      "Aries",
      "Taurus: visit the home of the Bull and Bear club",
      "Gemini: find the sculpture by this name",
      "Cancer: visit the site of a crustaceous world record at Northeastern",
      "Leo: visit the gate guarded by the lions",
      "Virgo: find the maiden that towers over the campus",
      "Libra: visit the home of law at Northeastern",
      "Scorpio: where might you study the removal of a scorpion's poison?",
      "Sagittarius: where does the stone archer stand in waiting",
      "Capricorn: which Huntington coffee shop is the GOAT?",
      "Aquarius: what flowing water does the water bearer drink from?",
      "Pisces: find the home of the fish",
    ];
    constructor() {
      super(
        "Zodiac Guidebook",
        "A guidebook to the signs of the zodiac",
        {
          use: () => {
            this.timesUsed++;
            return this.messages[(this.timesUsed - 1) % this.messages.length];
          },
        },
        false,
        "https://cdn.britannica.com/45/104045-050-116C1F93/Signs-of-the-Zodiac-astrology.jpg"
      );
    }
  }
  const aries = new Item(
    "Aries Totem",
    "A totem of the ram",
    {
      use: () => {
        return `Enter Barletta to begin
        Take your time and don’t fall in
        Journey to a doorway of bad omens
        Count sheep if you must but remain within
        `;
      },
    },
    "https://hips.hearstapps.com/hmg-prod/images/aries-zodiac-sign-abstract-night-sky-background-royalty-free-image-1584536731.jpg"
  );
  const taurus = new Item(
    "Taurus Totem",
    "A totem of the bull",
    {
      use: () => {
        return `A bull who tries to Dodge your course
        Be sure to catch him with all your force
        
        `;
      },
    },
    "https://hips.hearstapps.com/hmg-prod/images/taurus-zodiac-sign-abstract-night-sky-background-royalty-free-image-1587395874.jpg"
  );

  const gemini = new Item(
    "Gemini Totem",
    "A totem of the twins",
    {
      use: () => {
        return `A friend in distress lies eastbound
        Hurry, for a husky has yet to be found
        Be ready for a supernatural scare
        If you do not find the soon to be pair
        
        `;
      },
    },
    "https://hips.hearstapps.com/hmg-prod/images/gemini-zodiac-sign-abstract-night-sky-background-royalty-free-image-1590508367.jpg"
  );

  const cancer = new Item(
    "Cancer Totem",
    "A totem of the crab",
    {
      use: () => {
        return `Enter the Curry Student Center to begin
        Find the sculpture of the twins
        Journey to a place where you can find a drink
        But don’t forget to pay your tab
        `;
      },
    },
    "https://hips.hearstapps.com/hmg-prod/images/cancer-zodiac-sign-abstract-night-sky-background-royalty-free-image-858078918-1560803578.jpg"
  );

  const leo = new Item(
    "Leo Totem",
    "A totem of the lion",
    {
      use: () => {
        return `Lend us your courage 
        Show us your roar
        Three locations side by side
        Three ghosts by each door
        First proceed to Willis
        Be prepared to explore
        You’ll meet the exorcist
        And he’ll tell you more
        
        `;
      },
    },
    "https://hips.hearstapps.com/hmg-prod/images/leo-zodiac-sign-abstract-night-sky-background-royalty-free-image-858075636-1563569425.jpg"
  );

  const virgo = new Item(
    "Virgo Totem",
    "A totem of the maiden",
    {
      use: () => {
        return `Enter the Curry Student Center to begin
        Find the sculpture of the twins
        Journey to a place where you can find a drink
        But don’t forget to pay your tab
        `;
      },
    },
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/september-horoscope-1534965429.jpg?crop=1.00xw:1.00xh;0,0&resize=480:*"
  );

  const libra = new Item(
    "Libra Totem",
    "A totem of the scales",
    {
      use: () => {
        return `Two star-crossed lovers, one road that divides
        The weight of his words on Krentzman could entwine their lives        
        `;
      },
    },
    "https://hips.hearstapps.com/hmg-prod/images/libra-zodiac-sign-abstract-night-sky-background-royalty-free-image-1568910403.jpg?crop=1.00xw:0.751xh;0,0.0959xh&resize=1200:*"
  );

  const scorpio = new Item(
    "Scorpio Totem",
    "A totem of the scorpion",
    {
      use: () => {
        return `Enter the Curry Student Center to begin
        Find the sculpture of the twins
        Journey to a place where you can find a drink
        But don’t forget to pay your tab
        `;
      },
    },
    "https://hips.hearstapps.com/hmg-prod/images/scorpio-zodiac-sign-abstract-night-sky-background-royalty-free-image-1571399986.jpg"
  );

  const sagittarius = new Item(
    "Sagittarius Totem",
    "A totem of the archer",
    {
      use: () => {
        return `An archer in bronze points the way
        Follow his path and do not stray
        
        `;
      },
    },
    "https://www.thelist.com/img/gallery/heres-how-being-a-sagittarius-could-affect-your-mental-health/l-intro-1621353446.jpg"
  );

  const capricorn = new Item(
    "Capricorn Totem",
    "A totem of the goat",
    {
      use: () => {
        return `An athlete at Dunkin
        Whose feet are hooven
        Get ready, get set
        You better get movin’
        
        `;
      },
    },
    "https://hips.hearstapps.com/hmg-prod/images/capricorn-zodiac-sign-abstract-night-sky-background-royalty-free-image-1576705058.jpg"
  );

  const aquarius = new Item(
    "Aquarius Totem",
    "A totem of the water bearer",
    {
      use: () => {
        return `Enter the Curry Student Center to begin
        Find the sculpture of the twins
        Journey to a place where you can find a drink
        But don’t forget to pay your tab
        `;
      },
    },
    "https://www.thelist.com/img/gallery/heres-how-being-an-aquarius-could-affect-your-mental-health/l-intro-1621260827.jpg"
  );

  const pisces = new Item(
    "Pisces Totem",
    "A totem of the fish",
    {
      use: () => {
        return `I used to be full, but now I’m alone
        Three of my children will be dined upon
        Two of my children, swimming far from home
        The final two left their brothers — they’re done
        They grew their own lungs, now they lounge in the sun
        
        `;
      },
    },
    "https://www.thelist.com/img/gallery/heres-what-pisces-season-will-mean-for-your-zodiac-sign/l-intro-1614095688.jpg"
  );

  const threshold = 1;

  class Cthulu extends NPC {
    correctAnswers = 0;
    messages = [
      {
        m: `12 signs of the stars, 12 perilous quests
        Each sign of the zodiac will be its own test
        Complete them all and return back here
        Your rewards will be great – do not fear
        
        `,
      },
      {
        m: `Consult the totems -- they'll show you the way. Take this totem guidebook. (Check your inventory)`,
        cond: () => {
          if (this.timesTalkedTo === 1) {
            addToInventory(new Guidebook());
            return true;
          }
          return false;
        },
      },
      {
        m: "Tell me what you've discovered.",
        cond: () => this.timesTalkedTo === 2,
      },
      {
        m: `What word is most important to the ram?`,
        cond: () => this.timesTalkedTo === 3,
        input: (answer) => {
          if (answer.toLowerCase() === "determination") {
            this.correctAnswers++;
          }
        },
      },
      {
        m: `What word is most important to the bull?`,
        cond: () => this.timesTalkedTo === 4,
        input: (answer) => {
          if (answer.toLowerCase() === "fortitude") {
            this.correctAnswers++;
          }
        },
      },
      {
        m: `What word is most important to the twins?`,
        cond: () => this.timesTalkedTo === 5,
        input: (answer) => {
          if (answer.toLowerCase() === "facsimile") {
            this.correctAnswers++;
          }
        },
      },
      {
        m: `What word is most important to the crab?`,
        cond: () => this.timesTalkedTo === 6,
        input: (answer) => {
          if (answer.toLowerCase() === "resilience") {
            this.correctAnswers++;
          }
        },
      },
      {
        m: `What word is most important to the lion?`,
        cond: () => this.timesTalkedTo === 7,
        input: (answer) => {
          if (answer.toLowerCase() === "valor") {
            this.correctAnswers++;
          }
        },
      },
      {
        m: `What word is most important to the maiden?`,
        cond: () => this.timesTalkedTo === 8,
        input: (answer) => {
          if (answer.toLowerCase() === "meritorious") {
            this.correctAnswers++;
          }
        },
      },
      {
        m: `What word is most important to the scales?`,
        cond: () => this.timesTalkedTo === 9,
        input: (answer) => {
          if (answer.toLowerCase() === "valor") {
            this.correctAnswers++;
          }
        },
      },
      {
        m: `What word is most important to the scorpion?`,
        cond: () => this.timesTalkedTo === 10,
        input: (answer) => {
          if (answer.toLowerCase() === "valor") {
            this.correctAnswers++;
          }
        },
      },
      {
        m: `What word is most important to the archer?`,
        cond: () => this.timesTalkedTo === 11,
        input: (answer) => {
          if (answer.toLowerCase() === "valor") {
            this.correctAnswers++;
          }
        },
      },
      {
        m: `What word is most important to the goat?`,
        cond: () => this.timesTalkedTo === 12,
        input: (answer) => {
          if (answer.toLowerCase() === "nimblefooted") {
            this.correctAnswers++;
          }
        },
      },
      {
        m: `What word is most important to the waterbearer?`,
        cond: () => this.timesTalkedTo === 13,
        input: (answer) => {
          if (answer.toLowerCase() === "valor") {
            this.correctAnswers++;
          }
        },
      },
      {
        m: `What word is most important to the fish?`,
        cond: () => this.timesTalkedTo === 14,
        input: (answer) => {
          if (answer.toLowerCase() === "antediluvian") {
            this.correctAnswers++;
          }
        },
      },
      // {
      //   m: `You have answered ${this.correctAnswers} questions correctly.`,
      //   cond: () => {
      //     if (this.timesTalkedTo === 15) {
      //       console.log(this.correctAnswers);
      //       return true;
      //     }
      //     return false;
      //   },
      // },
      {
        m: "You have completed the challenge. Visit the following link to claim your prize: ",
        cond: () =>
          this.timesTalkedTo >= 15 && this.correctAnswers >= threshold,
      },
      {
        m: `Not quite, you need to answer at least ${threshold} questions correctly.`,
        cond: () => {
          if (this.timesTalkedTo === 15 && this.correctAnswers < threshold) {
            this.correctAnswers = 0;
            this.timesTalkedTo = 1;
            return true;
          }
        },
      },
    ];
    passwords = {
      lion: "valor",
      ram: "determination",
      //crab: "resilience",
      bull: "fortitude",
      twins: "facsimile",
      maiden: "purity",
      //scales: "justice",
      //scorpion: "passion",
      //archer: "adventure",
      goat: "nimblefooted",
      //waterbearer: "friendship",
      fish: "antediluvian",
    };

    constructor() {
      super(
        "Cthulu",
        "The ancient beast towers over you.",
        "https://megapencil.co/wp-content/uploads/2021/06/CthulhuNrThreeSR.jpg"
      );
      console.log(this.messages);
    }
  }
  useEffect(() => {
    places["West F"].npcs.push(new Cthulu());
    places["Dodge Hall"].items.push(taurus);
    places["Law Quad"].items.push(gemini);
    places["Centennial"].items.push(cancer);
    places["Westland Gate"].items.push(leo);
    places["Meserve Hall"].items.push(virgo);
    places["Knowles Center"].items.push(libra);
    places["Behrakis"].items.push(scorpio);
    places["Hunter Statue"].items.push(sagittarius);
    places["Huntington Dunkin'"].items.push(capricorn);
    places["Raytheon Amphitheater"].items.push(aquarius);
    places["Koi Pond"].items.push(pisces);
    // places["Somewhere"].items.push(aries);
  }, []);
}
