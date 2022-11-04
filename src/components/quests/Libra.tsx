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
                m: "meow", // should not be possible?
            },
            {
                m: "All alone...",
                cond: () => {
                    if (convStage !== 0) {
                        return false;
                    } else if (roomContainsItem(places["Speare Hall"], "Love Letter")) {
                        convStage = 1;
                        this.timesTalkedTo = 0;
                        return false;
                    } else {
                        return true;
                    }
                },
            },
            {
                m: "Thank you for this. It's so hard being this close to Paws but yet so far away.",
                cond: () => convStage === 1 && this.timesTalkedTo === 0,
            },
            {
                m: "You see, I have a deathly fear of cars, and especially trains. Even the concept of crossing Huntington gives me chills. It feels like I'm on an island.",
                cond: () => convStage === 1 && this.timesTalkedTo === 1,
            },
            {
                m: "Let Paws know what my situation is. I'm sure he'd want an explanation for my absence.",
                cond: () => {
                    if (convStage == 1 && this.timesTalkedTo >= 2) {
                        convStage = 2;
                        this.timesTalkedTo = 0;
                        return true;
                    }
                    return false;
                }
            },
            {
                m: "snzzzzzz...",
                cond: () => {
                    if (convStage !== 2) {
                        return false;
                    } else if (roomContainsItem(places["Speare Hall"], "Another Love Letter")) {
                        convStage = 3;
                        this.timesTalkedTo = 0;
                        return false;
                    } else {
                        return true;
                    }
                },
            },
            {
                m: "I love Paws, but he needs to be more accomodating of my struggles. We all have our own battles that we're fighting.",
                cond: () => convStage == 3 && this.timesTalkedTo == 0,
            },
            {
                m: "I don't want to keep you running back and forth across that wretched avenue. Tell Paws that he needs to find some way, some method for us to be together. Our separation ends now.",
                cond: () => {
                    if (convStage == 3 && this.timesTalkedTo >= 1) {
                        convStage = 4;
                        this.timesTalkedTo = 0;
                        return true;
                    }
                    return false;
                }
            },
            {
                m: "Now it's just waiting...",
                cond: () => {
                    if (convStage !== 4) {
                        return false;
                    } else if (/- TODO: track if paws is done suggesting the hamper -/) {
                        convStage = 5;
                        this.timesTalkedTo = 0;
                        return false;
                    } else {
                        return true;
                    }
                },
            },
            {
                m: "This is...a curious solution. But I'll take it if I can be with Paws again. Away we go!",
                cond: () => convStage === 5, // TODO: also detect if in the hamper
            }, // TODO: do we remove Mingus from Speare here?
            {
                m: "I'm somehow more optimistic this time around.",
                cond: () => convStage === 5,
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
                m: "woof", // should not be possible?
            },
            {
                m: "Can I let you in on a secret? The love of my life is stuck on the other side of the railroad tracks. And what's worse, our opposing affiliations make it impossible to not be secretive about our struggle.",
                cond: () => convStage === 0 && this.timesTalkedTo === 0,
            },
            {
                m: "He was covertly mailed into Speare to be with me, but it's been radio silence ever since. I just want to communicate with him, if nothing else.",
                cond: () => convStage === 0 && this.timesTalkedTo === 1,
            },
            {
                m: "If you could give this letter to Mingus, it would ease my troubles, if only by a little. He needs to know I'm here for him.",
                cond: () => {
                    if (convStage === 0 && this.timesTalkedTo >= 2) {
                        addToInventory(LoveLetter);
                        convStage = 1;
                        this.timesTalkedTo = 0;
                        return true;
                    }
                    return false;
                }
            },
            {
                m: "I wonder if Mingus received my letter...",
                cond: () => {
                    if (convStage !== 1) {
                        return false;
                    } else if (/- TODO: find way to set stage to next on receival -/) {
                        convStage = 2;
                        this.timesTalkedTo = 0;
                        return false;
                    } else {
                        return true;
                    }
                },
            },
            {
                m: "Bruh. Is the only thing keeping us apart a fear of moving pieces of metal? That's so lame.",
                cond: () => convStage == 2 && this.timesTalkedTo == 0,
            },
            {
                m: "I can't just saunter over to Speare because then I'll get swarmed by students and word will get out about my illicit relationship. This is so frustrating.",
                cond: () => convStage == 2 && this.timesTalkedTo == 1,
            },
            {
                m: "Give him this other love letter. I fear I may have been too aggressive in this letter, but Mingus needs to get over himself.",
                cond: () => {
                    if (convStage == 2 && this.timesTalkedTo >= 2) {
                        addToInventory(AnotherLoveLetter);
                        convStage = 3;
                        this.timesTalkedTo = 0;
                        return true;
                    }
                    return false;
                }
            },
            {
                m: "Are trains really that scary?",
                cond: () => {
                    if (convStage !== 3) {
                        return false;
                    } else if (/- TODO: find way to set stage to next on receival -/) {
                        convStage = 4;
                        this.timesTalkedTo = 0;
                        return false;
                    } else {
                        return true;
                    }
                },
            },
            {
                m: "I suppose he's right. We need to be together on mutual terms. But then how do we get him across the street if he can't stand being around cars and trains?",
                cond: () => convStage == 4 && this.timesTalkedTo == 0,
            },
            {
                m: "Hmmm.....",
                cond: () => convStage == 4 && this.timesTalkedTo == 1,
            },
            {
                m: "I know! We can use a moving hamper. If we put Mingus in and take him across the street, he won't be exposed to his fear and he can jump out once the coast is clear.",
                cond: () => convStage == 4 && this.timesTalkedTo == 2,
            },
            {
                m: "If we're smart about this we can cover the top of the hamper so no one sees Mingus and all Mingus has to do is wait patiently inside the hamper.",
                cond: () => convStage == 4 && this.timesTalkedTo == 3,
            },
            {
                m: "Moving hampers are also inconspicious in Speare. Let's use this plan. I'm pretty sure there are some hampers in Squashbusters. Bring Mingus to me!",
                cond: () => {
                    if (convStage == 4 && this.timesTalkedTo >= 4) {
                        places["Squashbusters"].addToPlace(hamper);
                        convStage = 5;
                        this.timesTalkedTo = 0;
                        return true;
                    }
                    return false;
                }
            },
            {
                m: "MINGUS MY BELOVED!!!!! It's been so long. I could gaze into his jaded yet secretly hopeful eyes forever. Thank you so much, I don't know what I can do to repay you.",
                cond: () => convStage === 5 && this.timesTalkedTo === 0, // TODO: also detect if Mingus is here
            },
            {
                m: "Well, I suppose I can tell you the one word that's been on my mind: INSERT PASSWORD HERE", // TODO: yeah
                cond: () => convStage === 5 && this.timesTalkedTo >= 1, // TODO: also detect if Mingus is here
            },
            {
                m: "I can't wait. I hope this goes well.",
                cond: () => convStage === 5,
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

    class LoveLetter extends Droppable {
        active = false

        constructor() {
            super(
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
        }
    };

    class AnotherLoveLetter extends Droppable {
        active = false

        constructor() {
            super(
                "Another Love Letter",
                "Another message of forbidden love",
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
        }
    };

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
        places["Krentzman Quad"].npcs.push(new Paws());
    }, []);
}
