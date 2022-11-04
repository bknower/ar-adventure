import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { withVar } from "./UI";

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
  playerMarker,
}) => {
  const findNearestPlace = (latlng) => {
    return withVar(setPlaces, (places) => {
      var nearestDistance = 999999999;
      var nearestPlace = "";

      for (const [name, place] of Object.entries(places)) {
        const location = place.location;
        if (location) {
          var distance = latlng.distanceTo(L.latLng(location));
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestPlace = place;
          }
        }
      }
      return { nearestPlace: nearestPlace, nearestDistance: nearestDistance };
    });
  };
  const container = document.getElementById("map");

  if (container && !map.current) {
    map.current = L.map("map", {
      center: [42.339894, -71.089654],
      zoom: 17,
      layers: [
        L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
    map.current.on("click", (e) => {
      withVar(setDebugMode, (debugMode) => {
        if (debugMode) {
          navigator.clipboard.writeText(
            "[" + e.latlng.lat + ", " + e.latlng.lng + "]"
          );
          const { nearestDistance, nearestPlace } = findNearestPlace(e.latlng);
          if (
            nearestDistance < maxDistance ||
            (nearestPlace.name === "Great Construction Project" &&
              nearestDistance < 50)
          ) {
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
          markers.current.push({ circle: circle, marker: marker });
        }
      }
    }

    // playerMarker.addTo(map.current);
    // playerMarker.setLatLng([42.344232250493214, -71.09175682067873]);
    map.current.locate({ watch: true });
    playerMarker.current.addTo(map.current);

    // map.current.on("locationfound", (e) => {
    //   withVar(setDebugMode, (debugMode) => {
    //     if (!debugMode) {
    //       setPlayerLocation(L.latLng(e.latlng.lat, e.latlng.lng));
    //     }
    //   });
    // });

    // map.current.on("locationfound", (e) => {
    //   playerMarker.setLatLng([e.latlng.lat, e.latlng.lng]);
    //   setPlayerLocation([e.latlng.lat, e.latlng.lng]);
    // });
    // map.current.on("locationerror", (e) => {
    //   console.log("location error");
    // });
  }

  return <div id="map" style={{ height: height }}></div>;
};

export default Map;
