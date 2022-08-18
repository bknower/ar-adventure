import * as React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
// import { RestoreIcon, FavoriteIcon, LocationOnIcon } from "@mui/icons-material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BackpackIcon from "@mui/icons-material/Backpack";
import PlaceIcon from "@mui/icons-material/Place";
function UI() {
  const [page, setPage] = React.useState("Map");
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={page}
        onChange={(event, newPage) => {
          setPage(newPage);
        }}
      >
        <BottomNavigationAction label="Map" icon={<PlaceIcon />} />
        <BottomNavigationAction label="Inventory" icon={<BackpackIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Log" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default UI;
