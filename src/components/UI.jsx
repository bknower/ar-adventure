import React, { useEffect, useRef, useState, useCallback } from "react";
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
import { Item } from "../classes/Item";
import { NPC } from "../classes/NPC";
import { isEqual } from "lodash";
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
import { Pisces } from "./Pisces";
import { QuestWrapper } from "./QuestWrapper";

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
  if (err.code === 1) {
    alert("Error: Access is denied!");
  } else if (err.code === 2) {
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

  const [initialized, setInitialized] = useState(false);
  const addToInventory = (item) => {
    setInventory((inv) => [...inv, item]);
    return item;
  };
  const removeFromInventory = (item) => {
    setInventory((inv) => inv.filter((i) => i !== item));
    return item;
  };

  const addToPlace = (item) => {
    var newPlace;
    setPlayerPlace((playerPlace) => {
      setPlaces((places) => {
        newPlace = { ...places[playerPlace.name] };
        newPlace.items = [...newPlace.items, item];

        const newPlaces = { ...places };
        newPlaces[playerPlace.name] = newPlace;
        return newPlaces;
      });
      return newPlace;
    });
    return item;
  };

  const removeFromPlace = (item) => {
    setPlayerPlace((playerPlace) => {
      var newPlace;
      setPlaces((places) => {
        newPlace = { ...places[playerPlace.name] };
        newPlace.items = newPlace.items.filter((i) => {
          return i !== item;
        });
        const newPlaces = { ...places };
        newPlaces[playerPlace.name] = newPlace;
        return newPlaces;
      });
      return newPlace;
    });

    return item;
  };
  const locations = [
    new Place(
      "Snell Library",
      "",
      L.latLng([42.33859787224553, -71.08837723731996]),
      () => {}
    ),
    new Place(
      "Cy Young Statue",
      "",
      L.latLng([42.33893888345322, -71.08910143375398]),
      () => {}
    ),
    new Place(
      "SnEngineering",
      "",
      L.latLng([42.33811410898767, -71.08877420425416]),
      () => {}
    ),
    new Place(
      "Raytheon Amphitheater",
      "",
      L.latLng([42.337332942427665, -71.08938038349153]),
      () => {}
    ),
    new Place(
      "Shillman Hall",
      "",
      L.latLng([42.3374439717689, -71.09007239341737]),
      () => {}
    ),
    new Place(
      "Centennial",
      "",
      L.latLng([42.337083125693106, -71.09050154685976]),
      () => {}
    ),
    new Place(
      "EV",
      "",
      L.latLng([42.340287049189364, -71.08696639537813]),
      () => {}
    ),
    new Place(
      "Krentzman Quad",
      "",
      L.latLng([42.340088791335084, -71.0883128643036]),
      () => {}
    ),
    new Place(
      "Barletta Natatorium",
      "",
      L.latLng([42.338958709629345, -71.09008312225343]),
      () => {}
    ),
    new Place(
      "Cabot",
      "",
      L.latLng([42.33972796043619, -71.0895359516144]),
      () => {}
    ),
    new Place(
      "Richards Hall",
      "",
      L.latLng([42.33993414977485, -71.08866155147554]),
      () => {}
    ),
    new Place(
      "Ell Hall",
      "",
      L.latLng([42.33985088108484, -71.08811974525453]),
      () => {}
    ),
    new Place(
      "Dodge Hall",
      "",
      L.latLng([42.34021964158906, -71.08797490596773]),
      () => {}
    ),
    new Place(
      "Smolly's",
      "",
      L.latLng([42.33730518506171, -71.09216988086702]),
      () => {}
    ),
    new Place(
      "West Village Quad",
      "",
      L.latLng([42.337380526455064, -71.09269559383394]),
      () => {}
    ),
    new Place(
      "Gainsborough Parking Garage",
      "",
      L.latLng([42.34058046966647, -71.08535170555116]),
      () => {}
    ),
    new Place(
      "Matthews Arena",
      "",
      L.latLng([42.34178189328441, -71.08447194099428]),
      () => {}
    ),
    new Place(
      "Squashbusters",
      "",
      L.latLng([42.33792377488243, -71.08583450317384]),
      () => {}
    ),
    new Place(
      "Columbus Parking Garage",
      "",
      L.latLng([42.33853442809591, -71.0865104198456]),
      () => {}
    ),
    new Place(
      "ISEC 2",
      "",
      L.latLng([42.33745586775814, -71.08786761760713]),
      () => {}
    ),
    new Place(
      "ISEC Bridge",
      "",
      L.latLng([42.33771361363867, -71.08807682991029]),
      () => {}
    ),
    new Place(
      "Ryder Lot",
      "",
      L.latLng([42.33623849985987, -71.0904908180237]),
      () => {}
    ),
    new Place(
      "West Village Parking Garage",
      "",
      L.latLng([42.337003818585686, -71.09200894832613]),
      () => {}
    ),
    new Place(
      "Renaissance Parking Garage",
      "",
      L.latLng([42.33603229840315, -71.08801782131196]),
      () => {}
    ),
    new Place(
      "Ryder Hall",
      "",
      L.latLng([42.33675400054367, -71.09057664871217]),
      () => {}
    ),
    new Place(
      "Churchill Hall",
      "",
      L.latLng([42.338855613445276, -71.08862936496736]),
      () => {}
    ),
    new Place(
      "Mugar Life Sciences",
      "",
      L.latLng([42.33961296993443, -71.08698248863222]),
      () => {}
    ),
    new Place(
      "Curry Student Center",
      "",
      L.latLng([42.33923627543867, -71.08795881271364]),
      () => {}
    ),
    new Place(
      "Speare",
      "",
      L.latLng([42.34078665620959, -71.08976662158967]),
      () => {}
    ),
    new Place(
      "Bigaston's",
      "",
      L.latLng([42.34021567643383, -71.09066247940065]),
      () => {}
    ),
    new Place(
      "Steast",
      "",
      L.latLng([42.34123471309726, -71.09016358852388]),
      () => {}
    ),
    new Place(
      "Stwest",
      "",
      L.latLng([42.34081837715622, -71.09052300453187]),
      () => {}
    ),
    new Place(
      "Marino",
      "",
      L.latLng([42.340005522849914, -71.09027087688447]),
      () => {}
    ),
    new Place(
      "Hayden Hall",
      "",
      L.latLng([42.33920058847468, -71.08866691589357]),
      () => {}
    ),

    new Place(
      "West A",
      "",
      L.latLng([42.33736863045157, -71.09311938285829]),
      () => {}
    ),
    new Place(
      "West B",
      "",
      L.latLng([42.3373408731014, -71.09235763549806]),
      () => {}
    ),
    new Place(
      "West C",
      "",
      L.latLng([42.33718225943669, -71.09243273735048]),
      () => {}
    ),
    new Place(
      "West F",
      "",
      L.latLng([42.337277427683524, -71.09163880348207]),
      () => {}
    ),
    new Place(
      "West G",
      "",
      L.latLng([42.338562184919255, -71.09130620956422]),
      () => {}
    ),
    new Place(
      "West H",
      "",
      L.latLng([42.338843717720835, -71.09203040599824]),
      () => {}
    ),
    new Place(
      "Cargill Hall",
      "",
      L.latLng([42.33900232719481, -71.09167098999025]),
      () => {}
    ),
    new Place(
      "Stearns Center",
      "",
      L.latLng([42.33911335358854, -71.09142959117891]),
      () => {}
    ),
    new Place(
      "Kariotis Hall",
      "",
      L.latLng([42.33859787224553, -71.09100580215456]),
      () => {}
    ),
    new Place(
      "Meserve Hall",
      "",
      L.latLng([42.33761051541322, -71.09095752239229]),
      () => {}
    ),
    new Place(
      "Holmes Hall",
      "",
      L.latLng([42.337876191266105, -71.09093070030214]),
      () => {}
    ),
    new Place(
      "Lake",
      "",
      L.latLng([42.33818944941184, -71.09090387821199]),
      () => {}
    ),
    new Place(
      "Nightingale",
      "",
      L.latLng([42.338106178411465, -71.0899329185486]),
      () => {}
    ),
    new Place(
      "Dana Research Center",
      "",
      L.latLng([42.337975323759494, -71.08955204486848]),
      () => {}
    ),
    new Place(
      "Forsyth Building",
      "",
      L.latLng([42.33845512281881, -71.08990609645845]),
      () => {}
    ),
    new Place(
      "Library Quad",
      "",
      L.latLng([42.33889526584376, -71.08820021152498]),
      () => {}
    ),
    new Place(
      "Robinson Hall",
      "",
      L.latLng([42.33932351015426, -71.08676791191102]),
      () => {}
    ),
    new Place(
      "Science Quad",
      "",
      L.latLng([42.33949401402166, -71.08688056468965]),
      () => {}
    ),
    new Place(
      "Hurtig Hall",
      "",
      L.latLng([42.33965658704607, -71.08642995357515]),
      () => {}
    ),
    new Place(
      "Willis Hall",
      "",
      L.latLng([42.338106178411465, -71.09122574329378]),
      () => {}
    ),
    new Place(
      "Volleyball Court",
      "",
      L.latLng([42.338086351966545, -71.09168171882631]),
      () => {}
    ),
    new Place(
      "Richards Dunkin'",
      "",
      L.latLng([42.33960503954725, -71.08844697475435]),
      () => {}
    ),
    new Place(
      "Ruggles Dunkin",
      "",
      L.latLng([42.336424873671724, -71.08912825584413]),
      () => {}
    ),
    new Place(
      "Shillman Dunkin",
      "",
      L.latLng([42.337491555712276, -71.09054982662202]),
      () => {}
    ),
    new Place(
      "Green Line Stop",
      "",
      L.latLng([42.340025348689714, -71.08967006206514]),
      () => {}
    ),
    new Place(
      "Orange Line Stop",
      "",
      L.latLng([42.33671038141871, -71.08924090862276]),
      () => {}
    ),
  ];
  const tempPlaces = [];

  class DroppableI extends Item {
    dropped;
    constructor(
      addToInventory,
      addToPlace,
      removeFromInventory,
      removeFromPlace,
      name,
      description,
      actions = {},
      dropped = true,
      url = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/1920px-Question_mark_%28black%29.svg.png"
    ) {
      super(name, description, actions, url);
      this.dropped = dropped;
      const drop = () => {
        addToPlace(removeFromInventory(this));
        this.dropped = true;
        this.actions["pick up"] = pickUp;
        delete this.actions["drop"];
      };
      const pickUp = () => {
        addToInventory(removeFromPlace(this));
        this.dropped = false;
        this.actions["drop"] = drop;
        delete this.actions["pick up"];
      };
      if (dropped) {
        this.actions["pick up"] = pickUp;
      } else {
        this.actions["drop"] = drop;
      }
    }
  }

  const Droppable = DroppableI.bind(
    null,
    addToInventory,
    addToPlace,
    removeFromInventory,
    removeFromPlace
  );

  const [lastPlayerPlace, setLastPlayerPlace] = useState(outside);

  useEffect(() => {
    // tempPlaces.push(ISEC);
    // tempPlaces.push(IV);
    // tempPlaces.push(...locations);
    // for (let place of tempPlaces) {
    //   places[place.name] = place;
    // }
    setPage("nearme");

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
          console.log("set player place to", place.name);
          setPlayerPlace(place);
        }
      });
    }, errorHandler);
    setInitialized(true);
  }, []);

  useEffect(() => {
    for (let place of locations) {
      places[place.name] = place;
    }
    for (const [name, place] of Object.entries(tempPlaces)) {
      places[name] = place;
    }
    setPlaces((places) => ({ ...places }));
    setPlayerPlace(places["ISEC"]);
  }, [initialized]);

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
      {QuestWrapper({
        places,
        setPlaces,
        inventory,
        setInventory,
        playerPlace,
        setPlayerPlace,
        playerLocation,
        setPlayerLocation,
        Droppable,
        tempPlaces,
        children: [Pisces],
      })}
      {/* <QuestWrapper
        places={places}
        setPlaces={setPlaces}
        inventory={inventory}
        setInventory={setInventory}
        playerPlace={playerPlace}
        setPlayerPlace={setPlayerPlace}
        playerLocation={playerLocation}
        setPlayerLocation={setPlayerLocation}
        Droppable={Droppable}
        tempPlaces={tempPlaces}
      >
        <Pisces />
      </QuestWrapper> */}
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
