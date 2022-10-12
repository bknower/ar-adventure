import { createSlice } from "@reduxjs/toolkit";
import { Player } from "../classes/Player";
import { Place } from "../classes/Place";
import L, { LatLng } from "leaflet";
const outside = new Place("Outside", "You are outside", undefined);
const maxDistance = 25;
var log;

const places = [
  new Place(
    "ISEC",
    "It's ISEC",
    L.latLng([42.33783257291951, -71.08726143836977]),
    () => {}
  ),
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
    "Koi Pond",
    "",
    L.latLng([42.338911126796155, -71.08705759048463]),
    () => {}
  ),
  new Place(
    "IV",
    "",
    L.latLng([42.33551679180333, -71.08902096748353]),
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
const initialState = {
  places: {},
  player: new Player(outside),
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start: (state) => {
      for (let place of state.places) {
        state.places[place.name] = place;
      }
    },
    updatePlayerLocation: (state, action) => {
      const { position } = action.payload;
      state.player.location = L.latLng(
        position.coords.latitude,
        position.coords.longitude
      );
      // console.log("location updated", this.player.location);
      Object.entries(state.places).forEach(([name, place]) => {
        if (
          place.location !== null &&
          place.location.distanceTo(state.player.location) < maxDistance
        ) {
          state.player.place = place;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { start, updatePlayerLocation } = gameSlice.actions;

export default gameSlice.reducer;
