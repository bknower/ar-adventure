import React, { useEffect, useRef } from "react";
import L from "leaflet";

const Map = ({ game, height, map }) => {
  const container = document.getElementById("map");

  const markers = {
    ISEC: [42.33783257291951, -71.08726143836977],
    "Snell Library": [42.33859787224553, -71.08837723731996],
    "Cy Young Statue": [42.33893888345322, -71.08910143375398],
    SnEngineering: [42.33811410898767, -71.08877420425416],
    "Raytheon Amphitheater": [42.337332942427665, -71.08938038349153],
    "Shillman Hall": [42.3374439717689, -71.09007239341737],
    Centennial: [42.337083125693106, -71.09050154685976],
    EV: [42.340287049189364, -71.08696639537813],
    "Krentzman Quad": [42.340088791335084, -71.0883128643036],
    "Barletta Natatorium": [42.338958709629345, -71.09008312225343],
    Cabot: [42.33972796043619, -71.0895359516144],
    "Richards Hall": [42.33993414977485, -71.08866155147554],
    "Ell Hall": [42.33985088108484, -71.08811974525453],
    "Dodge Hall": [42.34021964158906, -71.08797490596773],
    "Smolly's": [42.33730518506171, -71.09216988086702],
    "West Village Quad": [42.337380526455064, -71.09269559383394],
    "Gainsborough Parking Garage": [42.34058046966647, -71.08535170555116],
    "Matthews Arena": [42.34178189328441, -71.08447194099428],
    Squashbusters: [42.33792377488243, -71.08583450317384],
    "Columbus Parking Garage": [42.33853442809591, -71.0865104198456],
    "ISEC 2": [42.33745586775814, -71.08786761760713],
    "ISEC Bridge": [42.33771361363867, -71.08807682991029],
    "Ryder Lot": [42.33623849985987, -71.0904908180237],
    "West Village Parking Garage": [42.337003818585686, -71.09200894832613],
    "Ryder Hall": [42.33675400054367, -71.09057664871217],
    "Churchill Hall": [42.338855613445276, -71.08862936496736],
    "Mugar Life Sciences": [42.33961296993443, -71.08698248863222],
    "Curry Student Center": [42.33923627543867, -71.08795881271364],
    Speare: [42.34078665620959, -71.08976662158967],
    "Bigaston's": [42.34021567643383, -71.09066247940065],
    Steast: [42.34123471309726, -71.09016358852388],
    Stwest: [42.34081837715622, -71.09052300453187],
    Marino: [42.340005522849914, -71.09027087688447],
    "Hayden Hall": [42.33920058847468, -71.08866691589357],
    "Koi Pond": [42.338911126796155, -71.08705759048463],
    IV: [42.33551679180333, -71.08902096748353],
    "West A": [42.33736863045157, -71.09311938285829],
    "West B": [42.3373408731014, -71.09235763549806],
    "West C": [42.33718225943669, -71.09243273735048],
    "West F": [42.337277427683524, -71.09163880348207],
    "West G": [42.338562184919255, -71.09130620956422],
    "West H": [42.338843717720835, -71.09203040599824],
    "Cargill Hall": [42.33900232719481, -71.09167098999025],
    "Stearns Center": [42.33911335358854, -71.09142959117891],
    "Kariotis Hall": [42.33859787224553, -71.09100580215456],
    "Meserve Hall": [42.33761051541322, -71.09095752239229],
    "Holmes Hall": [42.337876191266105, -71.09093070030214],
    Lake: [42.33818944941184, -71.09090387821199],
    Nightingale: [42.338106178411465, -71.0899329185486],
    "Dana Research Center": [42.337975323759494, -71.08955204486848],
    "Forsyth Building": [42.33845512281881, -71.08990609645845],
    "Library Quad": [42.33889526584376, -71.08820021152498],
    "Robinson Hall": [42.33932351015426, -71.08676791191102],
    "Science Quad": [42.33949401402166, -71.08688056468965],
    "Hurtig Hall": [42.33965658704607, -71.08642995357515],
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
    });
    for (const [name, location] of Object.entries(markers)) {
      L.marker(location).bindTooltip(name).addTo(map.current);
    }
  }
  // useEffect(() => {
  //   if (map.current) {
  //     map.current.invalidateSize();
  //     console.log("registered");

  //   }
  // }, []);

  return <div id="map" style={{ height: height }}></div>;
};

export default Map;
