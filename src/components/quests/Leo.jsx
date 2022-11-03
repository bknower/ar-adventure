import React, { useEffect, useRef, useState, useCallback } from "react";
import L, { LatLng } from "leaflet";
import { Place } from "../../classes/Place";
import { NPC } from "../../classes/NPC";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { roomContainsItem, withVar } from "../UI";
export function Leo({
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
  const firstUpdate = useRef(true);
  class LakeGhost extends NPC {
    messages = [
      {
        m: "You must be brave to challenge me, adventurer!",
      },
      {
        m: "Bring me something to keep me warm, and I might just let you live.",
        cond: () => this.timesTalkedTo >= 1,
      },
    ];
    constructor() {
      super(
        "The Ghost of Lake Hall",
        "Very spooky.",
        "https://media.npr.org/assets/img/2017/07/06/a-ghost-story-ags_field4-copy_rgb_wide-347a73dab943e9ca6a7ed3ef8f8ecbb61a6f0845-s1100-c50.jpg"
      );
    }
  }

  class NightingaleGhost extends NPC {
    messages = [
      {
        m: "You must be brave to challenge me, adventurer!",
      },
      {
        cond: () => this.timesTalkedTo >= 1,
        m: "I feel quite hungry. Bring me my favorite food, and I might just let you live.",
      },
    ];
    constructor() {
      super(
        "The Ghost of Nightingale Hall",
        "Very spooky.",
        "https://cdn.vox-cdn.com/thumbor/pr3jD5sfTRKpPinnYym_4A0gJaQ=/0x27:4415x3338/1400x1400/filters:focal(0x27:4415x3338):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/43170476/ghosts.0.0.jpg"
      );
    }
  }

  class HolmesGhost extends NPC {
    messages = [
      {
        m: "You must be brave to challenge me, adventurer!",
      },
      {
        m: "I have a deep craving... help me satisfy it and I might just let you live.",
        cond: () => this.timesTalkedTo >= 1,
      },
    ];
    constructor() {
      super(
        "The Ghost of Holmes Hall",
        "Very spooky.",
        "https://media.npr.org/assets/img/2017/07/06/a-ghost-story-ags_field4-copy_rgb_wide-347a73dab943e9ca6a7ed3ef8f8ecbb61a6f0845-s1100-c50.jpg"
      );
    }
  }
  class Aoun extends NPC {
    messages = [
      {
        m: "I am Joseph Aoun",
      },
      {
        m: "Thank you so much for helping me complete this project",
        cond: () => {
          return this.timesTalkedTo === 1;
        },
      },
      {
        m: "I think a reward is in order",
        cond: () => {
          return this.timesTalkedTo === 2;
        },
      },
      {
        m: "This word seems important to me: valor",
        cond: () => {
          return this.timesTalkedTo >= 3;
        },
      },
    ];
    constructor() {
      super(
        "Joseph Aoun",
        "The president of Northeastern University",
        "https://upload.wikimedia.org/wikipedia/commons/8/88/Joseph_Aoun_%282897155178%29_%28cropped%29.jpg"
      );
    }
  }

  class GhostBuster extends NPC {
    ready = false;
    messages = [
      {
        m: "Please help me deal with these ghosts -- they're terrifying!",
      },
      {
        m: "They've formed a ghost union, and they won't move unless I give them all what they want.",
        cond: () => this.timesTalkedTo === 1,
      },
      {
        m: "I have a bunch of items here, but I don't know which ghosts want which items.",
        cond: () => this.timesTalkedTo === 2,
      },
      {
        m: "If you think you can figure it out, I'll tell you something important.",
        cond: () => this.timesTalkedTo === 3,
      },
      {
        m: "Just come back to me when you think you've got it right, and I'll talk to their union rep.",
        cond: () => this.timesTalkedTo === 4,
      },
      {
        m: "That's it! You've got it right! Now we can finally complete our construction project!",
        cond: () =>
          !this.ready &&
          this.timesTalkedTo >= 4 &&
          withVar(setPlaces, (places) => {
            if (
              roomContainsItem(places["Lake Hall"], "Greek Fire") &&
              roomContainsItem(places["Nightingale Hall"], "Beetle") &&
              roomContainsItem(places["Holmes Hall"], "Pipe")
            ) {
              this.ready = true;
              markers.current.forEach((marker) => {
                console.log(marker, markers.current);
                marker.circle.remove();
                marker.marker.remove();
              });
              delete places["Lake Hall"];
              delete places["Nightingale Hall"];
              delete places["Holmes Hall"];
              const project = new Place(
                "Great Construction Project",
                "Over 141 Snell Libraries stacked on top of one another, forming the world's tallest building",
                L.latLng([42.33795946257105, -71.090478893829]),
                () => {}
              );
              project.npcs.push(new Aoun());
              L.circle(project.location, { radius: 45 }).addTo(map.current);
              L.marker(project.location)
                .bindTooltip(project.name)
                .addTo(map.current);
              places["Great Construction Project"] = project;
              setPlaces(places);
              setPlayerPlace("Great Construction Project");
              return true;
            }
            return false;
          }),
      },
      {
        m: "No, this is all wrong! You need to try something else.",
        cond: () => !this.ready && this.timesTalkedTo > 4,
      },
      {
        m: "Thanks so much for your help! I'll tell you the important thing now: valor",
        cond: () => this.ready,
      },
    ];
    constructor() {
      super(
        "GhostBuster",
        "Who's he gonna call?",
        "http://images.halloweencostume.com/products/8586/1-2/ghostbusters-costume.jpg"
      );
    }
  }

  const blanket = new Droppable(
    "Blanket",
    "It looks warm and fuzzy",
    {
      test: () => console.log(map.current),
    },
    true,
    "https://nypost.com/wp-content/uploads/sites/2/2021/12/EddieBauer110VoltFleeceSherpaThrow-Ash.jpeg?quality=90&strip=all"
  );
  const greekFire = new Droppable(
    "Greek Fire",
    "It looks flammable",
    {},
    true,
    "https://assets.catawiki.nl/assets/2019/5/30/1/4/d/14d85774-f4ea-4598-a307-672ca4c25d90.jpg"
  );
  const bonfire = new Droppable(
    "Bonfire",
    "The logs inside it crackle.",
    {},
    true,
    "https://www.ageco.co.uk/globalassets/ageco/media/viewpoint/blog-imagery/home-ins/og-bonfire.jpg"
  );
  const lighter = new Droppable(
    "Lighter",
    "I wonder what you could burn with this",
    {},
    true,
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/White_lighter_with_flame.JPG/1200px-White_lighter_with_flame.JPG"
  );
  const juul = new Droppable(
    "Juul",
    "Vape Nation",
    {},
    true,
    "https://assets.juul.com/ctf/images/tc11z0kp0vll/23AlDSR8FzdEh27XPLOIBe/c92c8bf8d78135f4a0fab63e4c33804b/1_1-Standing-JUUL_Device_Slate-Desktop_2x.jpg"
  );
  const pipe = new Droppable(
    "Pipe",
    "Very sophisticated",
    {},
    true,
    "https://www.the-tobacconist.co.uk/wp-content/uploads/2018/08/Peterson-Sherlock-Holmes-Collection-Original.jpg"
  );
  const chocolate = new Droppable(
    "Chocolate",
    "Tasty",
    {},
    true,
    "https://www.thespruceeats.com/thmb/ab5Ah9pdp9Ks6dY_9wOYPyLloOQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/dark_chocolate1-e58737b8bcbe4e4092f62d42c3c19fe0.jpg"
  );
  const pie = new Droppable(
    "Warm Pie",
    "Straight out of the oven",
    {},
    true,
    "https://www.seriouseats.com/thmb/v4DSOOtc6GKFD91NFruS3baAcOY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2017__09__20170730-bravetart-apple-pie-vicky-wasik-1-d491465470714b4f88832e9d33b0fdf8.jpg"
  );
  const beetle = new Droppable(
    "Beetle",
    "It crawls around on the ground",
    {},
    true,
    "https://www.insectsofalberta.com/images/2010-apr-19_histerbeetle.jpg"
  );
  const lettuce = new Droppable(
    "Lettuce",
    "Crunchy and fresh",
    {},
    true,
    "https://cdn11.bigcommerce.com/s-kc25pb94dz/images/stencil/1280x1280/products/193/607/cello_lettuce__20483.1655905801.jpg?c=2"
  );

  useEffect(() => {
    places["Lake Hall"].npcs.push(new LakeGhost());
    places["Nightingale Hall"].npcs.push(new NightingaleGhost());
    places["Holmes Hall"].npcs.push(new HolmesGhost());
    places["Willis Hall"].items.push(
      ...[
        beetle,
        blanket,
        bonfire,
        chocolate,
        pie,
        lighter,
        juul,
        greekFire,
        lettuce,
        pipe,
      ]
    );
    places["Willis Hall"].npcs.push(...[new GhostBuster()]);
  }, []);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    // if (!firstUpdate.current) {
    //   console.log(
    //     "places changed",
    //     roomContainsItem(places["Lake Hall"], "Greek Fire")
    //   );
    //   setPlaces((places) => {
    //     if (roomContainsItem(places["Lake Hall"], "Greek Fire")) {
    //       places["Lake Hall"].finished = true;
    //       return places;
    //     }
    //   });
    // }
  }, [itemEvent]);
}
