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
import { Place } from "../classes/Place";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { ItemList } from "./ItemList";

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
import Room from "./Room";
import DialogueTree from "react-dialogue-tree";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { Aoun, Paws } from "../classes/NPCs";
import { Shield, Sword } from "../classes/Items";
import { GenerateGameState } from "./GenerateGame";

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

const outside = new Place("Outside", "You are outside", undefined);
const maxDistance = 25;

const errorHandler = (err) => {
  if (err.code == 1) {
    alert("Error: Access is denied!");
  } else if (err.code == 2) {
    alert("Error: Position is unavailable!");
  }
};
function UI() {
  const [page, setPage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const map = useRef(null);

  const [bottomBarRef, setBottomBarRef] = useState(null);
  const [pageHeight, setPageHeight] = useState("100px");
  const [places, setPlaces] = useState({});
  const [inventory, setInventory] = useState([]);
  const [playerPlace, setPlayerPlace] = useState(outside);
  const [playerLocation, setPlayerLocation] = useState(L.latLng([0, 0]));

  useEffect(() => {
    setPage("map");
    globalThis.log = new Messages(() => {
      setShowMessage(true);
    });

    // places["ISEC"].npcs.push(Aoun);

    var options = { timeout: 5000, enableHighAccuracy: true };
    navigator.geolocation.watchPosition((pos) => {
      const position = [pos.coords.latitude, pos.coords.longitude];
      setPlayerLocation(L.latLng(position));
      // console.log("location updated", this.player.location);
      Object.entries(places).forEach(([name, place]) => {
        if (
          place.location !== null &&
          place.location.distanceTo(playerLocation) < maxDistance
        ) {
          setPlayerPlace(place);
        }
      });
    }, errorHandler);
  }, []);

  // const dialogue = `title: Node_Title
  // ---
  // Here are some lines!
  // Wow!
  // ===`;
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
      {GenerateGameState({
        places,
        setPlaces,
        inventory,
        setInventory,
        playerPlace,
        setPlayerPlace,
        playerLocation,
        setPlayerLocation,
      })}
      <div style={{ display: page === "map" ? "block" : "none" }}>
        <Map
          height={pageHeight}
          map={map}
          places={places}
          playerLocation={playerLocation}
          setPlayerLocation={setPlayerLocation}
          playerPlace={playerPlace}
          setPlayerPlace={setPlayerPlace}
        />
      </div>
      {page === "inventory" && (
        <Container component="main" style={{ overflow: "auto" }}>
          <Stack spacing={2}>
            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
              <Typography variant="h2" component="h1" gutterBottom>
                Inventory
              </Typography>
            </Container>
            <ItemList items={inventory} />
          </Stack>
        </Container>
      )}
      {page === "nearme" && <Room playerPlace={playerPlace} />}
      {/* <DialogueTree dialogue={dialogue} /> */}
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
