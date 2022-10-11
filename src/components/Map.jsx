import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";

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
  playerLocation,
  setPlayerLocation,
  playerPlace,
  setPlayerPlace,
}) => {
  const container = document.getElementById("map");

  const markers = places;
  const test = L.latLng(42.344547, -71.088532);

  //const playerCircle = L.circle(test, { radius: 40 }).addTo(map.current);
  var playerMarker = L.marker(test, { icon: greenIcon }).bindTooltip("player");

  const findNearestPlace = (latlng) => {
    var nearestDistance = 999999999;
    var nearestPlace = "";

    for (const [name, place] of Object.entries(markers)) {
      const location = place.location;
      var distance = latlng.distanceTo(L.latLng(location));
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestPlace = place;
      }
    }
    return { nearestPlace: nearestPlace, nearestDistance: nearestDistance };
  };

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
      console.log([e.latlng.lat, e.latlng.lng]);
      // navigator.clipboard.writeText(
      //   "[" + e.latlng.lat + ", " + e.latlng.lng + "]"
      // );
      const { nearestDistance, nearestPlace } = findNearestPlace(e.latlng);
      console.log(nearestPlace, nearestDistance);
      if (nearestDistance < 15) {
        console.log(
          "You are near " +
            nearestPlace.name +
            " (" +
            nearestDistance.toFixed(2) +
            " meters)"
        );
        setPlayerPlace(nearestPlace);
      }
    });
    for (const [name, place] of Object.entries(markers)) {
      const location = place.location;
      L.circle(location, { radius: 15 }).addTo(map.current);
      L.marker(location).bindTooltip(name).addTo(map.current);
    }

    console.log("added marker initially");
    playerMarker.addTo(map.current);
    playerMarker.setLatLng([42.344232250493214, -71.09175682067873]);
    map.current.locate({ watch: true });
    map.current.on("locationfound", (e) => {
      playerMarker.setLatLng([e.latlng.lat, e.latlng.lng]);
      setPlayerLocation([e.latlng.lat, e.latlng.lng]);
      console.log("location found");
    });
    map.current.on("locationerror", (e) => {
      console.log("location error");
    });

    console.log(map);
  }

  return <div id="map" style={{ height: height }}></div>;
};

export default Map;
