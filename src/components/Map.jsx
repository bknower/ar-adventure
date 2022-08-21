import React, { useEffect, useRef } from "react";
import L from "leaflet";

const Map = ({ game, height, map }) => {
  const container = document.getElementById("map");
  const resizeObserver = new ResizeObserver(() => {
    map.invalidateSize();
  });

  if (container && !map.current) {
    map.current = L.map("map", {
      center: [49.8419, 24.0315],
      zoom: 16,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
  }
  useEffect(() => {
    if (map.current) {
      map.current.invalidateSize();
    }
  }, []);

  return <div id="map" style={{ height: height }}></div>;
};

export default Map;
