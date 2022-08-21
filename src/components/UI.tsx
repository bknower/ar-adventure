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
import { resolveSoa } from "dns";

function UI({ game }: { game: Game }) {
  const [page, setPage] = useState("map");
  const [bottomBarRef, setBottomBarRef] = useState<any>(null);
  const [pageHeight, setPageHeight] = useState("100px");
  const [resetting, setResetting] = useState(false);

  const updatePageHeight = () => {
    if (bottomBarRef !== null) {
      const height = bottomBarRef.clientHeight;
      const windowHeight = window.innerHeight;
      setPageHeight(windowHeight - height + "px");
      console.log("updated", windowHeight - height);
      setResetting(true);
    }
  };
  window.addEventListener("resize", updatePageHeight);
  useEffect(() => {
    updatePageHeight();
  }, [bottomBarRef]);
  useEffect(() => {
    if (resetting) {
      setResetting(false);
      console.log("resetting false");
    }
  });
  useEffect(() => {
    if (resetting) {
      setResetting(false);
      console.log("resetting false");
    }
  }, [resetting]);
  return (
    <>
      {!resetting
        ? page === "map" && <Map game={game} height={pageHeight} />
        : null}
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
