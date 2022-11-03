import React, { useEffect, useRef, useState, useCallback } from "react";
import L, { LatLng } from "leaflet";
import { Place } from "../../classes/Place";
import { NPC } from "../../classes/NPC";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { withVar } from "../UI";

var redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function Taurus({
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
  maxDistance,
}) {
  const test = L.latLng(42.344547, -71.088532);
  const waypoints = [
    [42.335857819719365, -71.09059787950743],
    [42.33642090827721, -71.09204633658588],
    [42.33698399179325, -71.09350552297607],
    [42.3386414900613, -71.09244332111851],
    [42.34093336545358, -71.09110215715697],
    [42.3425035294383, -71.09023307434849],
    [42.34140917686244, -71.08662802561983],
    [42.34028308403841, -71.08478259257014],
    [42.33868907309853, -71.08696064284369],
    [42.33705536821688, -71.08940692590957],
  ];
  const bullMarker = L.marker([42.33985088108484, -71.08811974525453], {
    icon: redIcon,
  }).bindTooltip("Bull");
  const circle = L.circle([42.33985088108484, -71.08811974525453], {
    radius: maxDistance,
  });
  const steps = 1000;
  class Bull extends NPC {
    found = false;
    curr = 0;
    step = 0;
    interval;

    messages = [
      {
        m: "**snorts** Try to catch my friend if you can!",
      },
      {
        m: "Ready... Set... GO!",
        cond: () => {
          if (this.timesTalkedTo === 1) {
            bullMarker.addTo(map.current);
            circle.addTo(map.current);
            // move the bull marker between waypoints
            this.interval = setInterval(() => {
              const currWaypoint = waypoints[this.curr];
              const nextWaypoint =
                waypoints[(this.curr + 1) % waypoints.length];
              const lat =
                currWaypoint[0] +
                (nextWaypoint[0] - currWaypoint[0]) * (this.step / steps);
              const lng =
                currWaypoint[1] +
                (nextWaypoint[1] - currWaypoint[1]) * (this.step / steps);
              bullMarker.setLatLng([lat, lng]);
              circle.setLatLng([lat, lng]);
              this.step++;
              if (this.step > steps) {
                this.step = 0;
                this.curr = (this.curr + 1) % waypoints.length;
              }
              if (
                withVar(setPlayerLocation, (loc) =>
                  loc.distanceTo(L.latLng([lat, lng]))
                ) < maxDistance
              ) {
                this.found = true;
                clearInterval(this.interval);
                bullMarker.remove();
                circle.remove();
              }
            }, 10);

            // bullMarker.setLatLng([42.33985088108484, -71.08811974525453]);
            return true;
          }
          return false;
        },
      },
      {
        m: "You caught them! Now I feel compelled to tell you the following word: fortitude.",
        cond: () => this.found,
      },
    ];
    constructor() {
      super(
        "Bull",
        "He looks strong as a bull.",
        "https://worldbirds.com/wp-content/uploads/2020/05/bull6.jpg"
      );
    }
  }
  useEffect(() => {
    places["Dodge Hall"].npcs.push(new Bull());
  }, []);
}
