import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  FormControlLabel,
  FormLabel,
  Paper,
  Switch,
} from "@mui/material";
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
import { Pisces } from "./quests/Pisces";
import { QuestWrapper } from "./QuestWrapper";
import { Gemini } from "./quests/Gemini";
import { Aries } from "./quests/Aries";
import { Leo } from "./quests/Leo";
import { Capricorn } from "./quests/Capricorn";
import { Taurus } from "./quests/Taurus";
import { Aquarius } from "./quests/Aquarius";
import { Final } from "./quests/Final";
import { Virgo } from "./quests/Virgo";

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

const maxDistance = 15;

const errorHandler = (err) => {
  if (err.code === 1) {
    alert("Error: Access is denied!");
  } else if (err.code === 2) {
    alert("Error: Position is unavailable!");
  }
};

function useStateCallback(initialState) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null); // init mutable ref container for callbacks

  const setStateCallback = useCallback((state, cb) => {
    cbRef.current = cb; // store current, passed callback in ref
    setState(state);
  }, []); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    // cb.current is `null` on initial render,
    // so we only invoke callback on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
}

export const withVar = (setter, callback) => {
  let result;
  setter((variable) => {
    result = callback(variable);
    return variable;
  });
  return result;
};

// export const changeOneObject = (object, key, value) => {

function UI() {
  const [page, setPage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const map = useRef(null);

  const [bottomBarRef, setBottomBarRef] = useState(null);
  const [pageHeight, setPageHeight] = useState("100px");
  const [places, setPlaces] = useState({});
  const [inventory, setInventory] = useState([]);
  const [playerPlace, setPlayerPlace] = useState("Outside");
  const [playerLocation, setPlayerLocation] = useState(L.latLng([0, 0]));
  const [debugMode, setDebugMode] = useState(true);
  const [itemEvent, setItemEvent] = useState(false);
  const markers = useRef([]);

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
    withVar(setPlayerPlace, (playerPlace) => {
      withVar(setPlaces, (places) => {
        newPlace = { ...places[playerPlace] };
        newPlace.items.push(item);

        const newPlaces = { ...places };
        newPlaces[playerPlace] = newPlace;
        return newPlaces;
      });
      return playerPlace;
    });
    return item;
  };

  const removeFromPlace = (item) => {
    setPlayerPlace((playerPlace) => {
      var newPlace;
      setPlaces((places) => {
        newPlace = { ...places[playerPlace] };
        newPlace.items = newPlace.items.filter((i) => {
          return i !== item;
        });
        const newPlaces = { ...places };
        newPlaces[playerPlace] = newPlace;
        return newPlaces;
      });
      return playerPlace;
    });

    return item;
  };
  const roomContainsItem = (room, item) => {
    return room && room.items && room.items.some((i) => i.name === item);
  };

  const locations = [
    new Place("Outside", "You are outside", undefined),
    new Place(
      "Snell Library",
      "Need a place to study? The fourth floor is especially good for working on group projects",
      L.latLng([42.33859787224553, -71.08837723731996]),
      () => {}
    ),
    new Place(
      "Koi Pond",
      "",
      L.latLng([42.338911126796155, -71.08705759048463]),
      () => {}
    ),
    new Place(
      "Cy Young Statue",
      "This statue marks the original site of the pitching mound at the Huntington Avenue Grounds ballpark. ",
      L.latLng([42.33893888345322, -71.08910143375398]),
      () => {}
    ),
    new Place(
      "SnEngineering",
      "Snell Engineering, famous for not being Snell Library, a very creepy gateway, and probably some other stuff.",
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
      "The cat statue outside is officially named Yitz",
      L.latLng([42.3374439717689, -71.09007239341737]),
      () => {}
    ),
    new Place(
      "Centennial",
      "BYOH (Bring your own hammock)",
      L.latLng([42.337083125693106, -71.09050154685976]),
      () => {}
    ),
    new Place(
      "EV",
      "Honors only",
      L.latLng([42.340287049189364, -71.08696639537813]),
      () => {}
    ),
    new Place(
      "Krentzman Quad",
      "",
      L.latLng([42.34024739766851, -71.08844320888325]),
      () => {}
    ),
    new Place(
      "Barletta Natatorium",
      "No running. Don’t dive in the deep end",
      L.latLng([42.338958709629345, -71.09008312225343]),
      () => {}
    ),
    new Place(
      "Cabot",
      "I’ve only been in here for covid testing before",
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
      "Rub King Husky’s nose for luck",
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
      L.latLng([42.337376561120806, -71.09207433381216]),
      () => {}
    ),
    new Place(
      "IV",
      "",
      L.latLng([42.33551679180333, -71.08902096748353]),
      () => {}
    ),
    new Place(
      "ISEC",
      "The Interdisciplinary Science & Engineering Complex. Named the Most Beautiful Building in Boston in 2018",
      L.latLng([42.33783257291951, -71.08726143836977]),
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
      "A few dogs seem to be playing hockey here",
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
      "Or “EXP” — what a stupid name",
      L.latLng([42.33745586775814, -71.08786761760713]),
      () => {}
    ),
    new Place(
      "ISEC Bridge",
      "Has anyone ever tried to polish the rust bridge?",
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
      "Do knights park here?",
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
      "Best sandwiches since Rebecca’s",
      L.latLng([42.338855613445276, -71.08862936496736]),
      () => {}
    ),
    new Place(
      "Mugar Life Sciences",
      "",
      L.latLng([42.34004120935708, -71.0873063565693]),
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
      "Break a leg!",
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
      "Anyone can cook",
      L.latLng([42.34123471309726, -71.09016358852388]),
      () => {}
    ),
    new Place(
      "Stwest",
      "West is NOT best",
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
      L.latLng([42.33774930144655, -71.09227796255537]),
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
      L.latLng([42.33883182199418, -71.09166155562046]),
      () => {}
    ),
    new Place(
      "Knowles Center",
      "",
      L.latLng([42.339390918715246, -71.09082982450353]),
      () => {}
    ),
    new Place(
      "Kariotis Hall",
      "",
      L.latLng([42.338661316331184, -71.0908457376875]),
      () => {}
    ),
    new Place(
      "Meserve Hall",
      "",
      L.latLng([42.33760655009348, -71.09103379639922]),
      () => {}
    ),
    new Place(
      "Holmes Hall",
      "",
      L.latLng([42.337903948379996, -71.09102811770785]),
      () => {}
    ),
    new Place(
      "Lake Hall",
      "",
      L.latLng([42.33818944941184, -71.09090387821199]),
      () => {}
    ),
    new Place(
      "Nightingale Hall",
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
      L.latLng([42.339168866711915, -71.08665190776232]),
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
      "Eerie, old building for science experiments",
      L.latLng([42.33965658704607, -71.08642995357515]),
      () => {}
    ),
    new Place(
      "Willis Hall",
      "",
      L.latLng([42.33824892863032, -71.09133387934291]),
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
      "Northeastern students run on dunkin",
      L.latLng([42.33960503954725, -71.08844697475435]),
      () => {}
    ),
    new Place(
      "Ruggles Dunkin'",
      "Northeastern students run on dunkin",
      L.latLng([42.336424873671724, -71.08912825584413]),
      () => {}
    ),
    new Place(
      "Shillman Dunkin'",
      "Northeastern students run on dunkin",
      L.latLng([42.337491555712276, -71.09054982662202]),
      () => {}
    ),
    new Place(
      "Green Line Stop",
      "Don’t get hit by the trains as you cross",
      L.latLng([42.340025348689714, -71.08967006206514]),
      () => {}
    ),
    new Place(
      "Orange Line Stop",
      "Oak Grove or Forest Hills?",
      L.latLng([42.33671038141871, -71.08924090862276]),
      () => {}
    ),
    new Place(
      "Behrakis",
      "",
      L.latLng([42.3369641649945, -71.09125368317764]),
      () => {}
    ),
    new Place(
      "Westland Gate",
      "",
      L.latLng([42.34407365421169, -71.09000936413175]),
      () => {}
    ),
    new Place(
      "Huntington Dunkin'",
      "",
      L.latLng([42.34178585834087, -71.08633527119659]),
      () => {}
    ),
    new Place(
      "Hunter Statue",
      "",
      L.latLng([42.34010861714865, -71.0947176753505]),
      () => {}
    ),
    new Place(
      "Law Quad",
      "",
      L.latLng([42.3390776665548, -71.0911676758166]),
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
        setItemEvent((x) => !x);
        this.dropped = true;
        this.actions["pick up"] = pickUp;
        delete this.actions["drop"];
      };
      const pickUp = () => {
        addToInventory(removeFromPlace(this));
        setItemEvent((x) => !x);
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

  class Droppable extends DroppableI {
    constructor(
      name,
      description,
      actions = {},
      dropped = true,
      url = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/1920px-Question_mark_%28black%29.svg.png"
    ) {
      super(
        addToInventory,
        addToPlace,
        removeFromInventory,
        removeFromPlace,
        name,
        description,
        actions,
        dropped,
        url
      );
    }
  }

  class Shield extends Droppable {
    constructor(dropped) {
      super(
        "Shield",
        "A shield",
        {
          defend: () => {
            addToInventory(new Shield(false));
          },
          attack: () => {
            console.log("You bash the enemy with your shield!");
          },
        },
        dropped
      );
    }
  }

  useEffect(() => {
    for (let place of locations) {
      places[place.name] = place;
    }
    setPage("map");

    globalThis.log = new Messages(() => {
      setShowMessage(true);
    });

    setInitialized(true);
  }, []);

  const test = L.latLng(42.344547, -71.088532);
  const playerMarker = useRef(
    L.marker(test, { icon: greenIcon }).bindTooltip("player")
  );

  useEffect(() => {
    places["ISEC"].items.push(new Shield(true));
    for (const [name, place] of Object.entries(tempPlaces)) {
      places[name] = place;
    }
    setPlaces((places) => ({ ...places }));
    setPlayerPlace("Meserve Hall");
    var options = { timeout: 5000, enableHighAccuracy: true };
    navigator.geolocation.watchPosition((pos) => {
      withVar(setDebugMode, (debugMode) => {
        if (!debugMode) {
          const position = [pos.coords.latitude, pos.coords.longitude];
          setPlayerLocation(L.latLng(position[0], position[1]));
          playerMarker.current.setLatLng(position);
          console.log(position);
        }
      });
    }, errorHandler);
  }, [initialized]);

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

  useEffect(() => {
    setPage("nearme");
  }, [playerPlace]);

  const firstRun = useRef(true);
  useEffect(() => {
    if (!firstRun.current && !debugMode) {
      var nearestDistance = 999999999;
      var nearestPlace = "";

      for (const [name, place] of Object.entries(places)) {
        const location = place.location;
        if (location) {
          var distance = playerLocation.distanceTo(L.latLng(location));
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestPlace = place;
          }
        }
      }
      if (
        nearestDistance < maxDistance ||
        (nearestPlace.name === "Great Construction Project" &&
          nearestDistance < 50)
      ) {
        console.log("set player place to " + nearestPlace.name);
        setPlayerPlace(nearestPlace.name);
      } else {
        setPlayerPlace("Outside");
      }
    } else {
      firstRun.current = false;
    }
  }, [playerLocation]);
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
        addToInventory,
        removeFromInventory,
        addToPlace,
        removeFromPlace,
        roomContainsItem,
        itemEvent,
        map,
        markers,
        maxDistance,
        children: [
          Pisces,
          Gemini,
          Aries,
          Leo,
          Capricorn,
          Taurus,
          Aquarius,
          Final,
          Virgo,
        ],
      })}
      <div style={{ display: page === "map" ? "block" : "none" }}>
        <Map
          height={pageHeight}
          map={map}
          places={places}
          setPlaces={setPlaces}
          playerLocation={playerLocation}
          setPlayerLocation={setPlayerLocation}
          playerPlace={playerPlace}
          setPlayerPlace={setPlayerPlace}
          debugMode={debugMode}
          setDebugMode={setDebugMode}
          maxDistance={maxDistance}
          markers={markers}
          playerMarker={playerMarker}
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
      {page === "nearme" && <Room playerPlace={playerPlace} places={places} />}
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
            icon={
              <FormControlLabel
                control={
                  <Switch
                    checked={debugMode}
                    onClick={(event) => setDebugMode(!debugMode)}
                  />
                }
              />
            }
            label="Debug Mode"
          ></BottomNavigationAction>
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default UI;
