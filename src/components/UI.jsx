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
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NearMeIcon from "@mui/icons-material/NearMe";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import MessageModal from "./MessageModal";
import { Messages } from "../classes/Messages";
/*global globalThis*/

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function UI() {
  const [page, setPage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const map = useRef(null);
  var game;

  const [bottomBarRef, setBottomBarRef] = useState(null);
  const [pageHeight, setPageHeight] = useState("100px");
  useEffect(() => {
    setPage("map");
    globalThis.log = new Messages(() => {
      setShowMessage(true);
    });
    game = new Game();
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
      <Modal
        open={showMessage}
        onClose={() => setShowMessage(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
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
            icon={<NearMeIcon />}
            label="Near Me"
            onClick={() => setPage("nearme")}
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
