import { Player } from "./Player";
import { Place } from "./Place";

import L, { LatLng } from "leaflet";

const outside = new Place("Outside", "You are outside", undefined);
const maxDistance = 25;
export class Game {
  over: boolean = false;
  places: Place[] = [];
  player: Player;
  constructor() {
    this.player = new Player(outside);
    this.start();
  }
  start() {
    console.log("Welcome to the game.");
    // while (!this.over) {
    //   this.updatePlayerLocation(this.places);
    // }
  }

  updatePlayerLocation(places: Place[]): void {
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
        this.player.place = place;
      }
    });
  }
}
