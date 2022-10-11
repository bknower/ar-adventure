import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { start, updatePlayerLocation } from "../redux/gameSlice";
import L from "leaflet";

const Map = ({ height, map, places, playerLocation }) => {
  const container = document.getElementById("map");

  const markers = places;
  const test = L.latLng(42.344547, -71.088532);

  //const playerCircle = L.circle(test, { radius: 40 }).addTo(map.current);
  var playerMarker = L.marker(test).bindTooltip("player");

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
      navigator.clipboard.writeText(
        "[" + e.latlng.lat + ", " + e.latlng.lng + "]"
      );
      // const { nearestDistance, nearestPlace } = findNearestPlace(e.latlng);
      // console.log(nearestPlace, nearestDistance);
      // if (nearestDistance < 15) {
      //   console.log(
      //     "You are near " +
      //       nearestPlace.name +
      //       " (" +
      //       nearestDistance.toFixed(2) +
      //       " meters)"
      //   );
      //   player.location = nearestPlace;
      // }
    });
    for (const [name, place] of Object.entries(markers)) {
      const location = place.location;
      L.circle(location, { radius: 15 }).addTo(map.current);
      L.marker(location).bindTooltip(name).addTo(map.current);
    }

    // var marker = L.marker(test).addTo(map.current);

    // function onLocationFound(e) {
    //   console.log("location found");
    //   marker = L.marker([e.latlng.lat, e.latlng.lng]).update(marker);
    //   alert("New latitude is " + e.latlng.lat);
    // }

    // map.current.on("locationfound", onLocationFound);
    console.log("added marker initially");
    playerMarker.addTo(map.current);
    playerMarker.setLatLng([42.344232250493214, -71.09175682067873]);
    map.current.locate({ watch: true });
    map.current.on("locationfound", (e) => {
      playerMarker.setLatLng([e.latlng.lat, e.latlng.lng]);
    });
    map.current.on("locationerror", (e) => {
      console.log("location error");
    });

    console.log(map);
  }

  // useEffect(() => {
  //   dispatch(start);
  //   // globalThis.log.send("Welcome to the game.");
  //   var options = { timeout: 5000, enableHighAccuracy: true };
  //   navigator.geolocation.watchPosition((pos) => {
  //     const position = [pos.coords.latitude, pos.coords.longitude];
  //     dispatch(updatePlayerLocation({ position }));
  //   }, errorHandler);
  // }, []);
  useEffect(() => {
    if (container && map.current) {
      console.log("trying to add");
      playerMarker.setLatLng([42.34400228575448, -71.08452558517457]);

      // map.current.removeLayer(playerMarker);
      // playerMarker = L.marker(playerLocation)
      //   .bindTooltip("player")
      //   .update(playerMarker);
      // playerMarker.addTo(map.current);
      // // playerMarker.addTo(map.current);
      // console.log("adding player marker", playerLocation);
      // L.circle(game.player.location, { radius: 40 }).addTo(map.current);
      // L.marker(game.player.location).bindTooltip("player").addTo(map.current);
    }
  }, [playerLocation, playerMarker]);
  // useEffect(() => {
  //   if (map.current) {
  //     map.current.invalidateSize();
  //     console.log("registered");

  //   }
  // }, []);

  return <div id="map" style={{ height: height }}></div>;
};

export default Map;
