import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { withVar } from "./UI";

var greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = ({
  height,
  map,
  places,
  setPlaces,
  playerLocation,
  setPlayerLocation,
  playerPlace,
  setPlayerPlace,
  debugMode,
  setDebugMode,
  maxDistance,
  markers,
  findNearestPlace,
}) => {
  const container = document.getElementById("map");

  const test = L.latLng(42.344547, -71.088532);

  //const playerCircle = L.circle(test, { radius: 40 }).addTo(map.current);
  var playerMarker = L.marker(test, { icon: greenIcon }).bindTooltip("player");

  if (container && !map.current) {
    map.current = L.map("map", {
      center: [42.339894, -71.089654],
      zoom: 17,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
    map.current.on("click", (e) => {
      withVar(setDebugMode, (debugMode) => {
        if (debugMode) {
          console.log([e.latlng.lat, e.latlng.lng]);
          // navigator.clipboard.writeText(
          //   "[" + e.latlng.lat + ", " + e.latlng.lng + "]"
          // );
          const { nearestDistance, nearestPlace } = findNearestPlace(e.latlng);
          console.log(nearestPlace, nearestDistance);
          if (
            nearestDistance < maxDistance ||
            (nearestPlace.name === "Great Construction Project" &&
              nearestDistance < 50)
          ) {
            console.log(
              "You are near " +
                nearestPlace.name +
                " (" +
                nearestDistance.toFixed(2) +
                " meters)"
            );
            console.log("set player place to " + nearestPlace.name);
            setPlayerPlace(nearestPlace.name);
          }
        }
      });
    });

    for (const [name, place] of Object.entries(places)) {
      const location = place.location;
      if (location) {
        const circle = L.circle(location, { radius: maxDistance }).addTo(
          map.current
        );
        const marker = L.marker(location).bindTooltip(name).addTo(map.current);
        if (["Lake Hall", "Holmes Hall", "Nightingale Hall"].includes(name)) {
          console.log(name);
          markers.current.push({ circle: circle, marker: marker });
        }
      }
    }

    playerMarker.addTo(map.current);
    playerMarker.setLatLng([42.344232250493214, -71.09175682067873]);
    map.current.locate({ watch: true });
    map.current.on("locationfound", (e) => {
      playerMarker.setLatLng([e.latlng.lat, e.latlng.lng]);
      setPlayerLocation([e.latlng.lat, e.latlng.lng]);
    });
    // map.current.on("locationerror", (e) => {
    //   console.log("location error");
    // });
  }

  return <div id="map" style={{ height: height }}></div>;
};

export default Map;
