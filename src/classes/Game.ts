import { Player } from "./Player";
import { Place } from "./Place";

import L, { LatLng } from "leaflet";

const outside = new Place("Outside", "You are outside", undefined);
const maxDistance = 25;
export class Game {
  over: boolean = false;
  places: Place[] = [];

  constructor() {
    this.start();
  }
  start() {
    const player = new Player(outside);
    console.log("Welcome to the game.");
    while (!this.over) {
      this.updatePlayerLocation(player, this.places);
    }
  }

  updatePlayerLocation(player: Player, places: Place[]): void {
    var playerLocation = L.latLng(0, 0);
    navigator.geolocation.getCurrentPosition((position) => {
      playerLocation = L.latLng(
        position.coords.latitude,
        position.coords.longitude
      );
    });
    places.forEach((place) => {
      if (
        place.location !== null &&
        place.location.distanceTo(playerLocation) < maxDistance
      ) {
        player.place = place;
      }
    });
  }
}
