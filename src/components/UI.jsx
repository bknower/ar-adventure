import React, { useEffect, useRef, useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
// import { RestoreIcon, FavoriteIcon, LocationOnIcon } from "@mui/icons-material";
import BookIcon from "@mui/icons-material/LibraryBooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BackpackIcon from "@mui/icons-material/Backpack";
import PlaceIcon from "@mui/icons-material/Place";
import { Game } from "../classes/Game";
import Map from "./Map";
import Inventory from "./Inventory";
import L, { LatLng } from "leaflet";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

function UI({ game }) {
  const [page, setPage] = useState("");
  const map = useRef(null);

  const [bottomBarRef, setBottomBarRef] = useState(null);
  const [pageHeight, setPageHeight] = useState("100px");
  useEffect(() => {
    setPage("map");
  }, []);
  const updatePageHeight = () => {
    if (map.current && bottomBarRef !== null) {
      const height = bottomBarRef.clientHeight;
      const windowHeight = window.innerHeight;
      setPageHeight(windowHeight - height + "px");
      map.current.invalidateSize();
    }
  };
  window.addEventListener("resize", updatePageHeight);
  useEffect(() => {
    updatePageHeight();
  }, [bottomBarRef, page]);

  return (
    <>
      <div style={{ display: page === "map" ? "block" : "none" }}>
        <Map game={game} height={pageHeight} map={map} />
      </div>
      {page === "inventory" && <Inventory game={game} />}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
        className="bottom-bar"
        ref={(node) => {
          setBottomBarRef(node);
        }}
      >
        <BottomNavigation showLabels value={page}>
          <BottomNavigationAction
            icon={<PlaceIcon />}
            label="Map"
            onClick={() => setPage("map")}
          ></BottomNavigationAction>
          <BottomNavigationAction
            icon={<BackpackIcon />}
            label="Inventory"
            onClick={() => setPage("inventory")}
          ></BottomNavigationAction>
          <BottomNavigationAction
            icon={<BookIcon />}
            label="Log"
            onClick={() => setPage("log")}
          ></BottomNavigationAction>
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default UI;
