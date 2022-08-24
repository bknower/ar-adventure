import React, { useState } from "react";
import "./App.css";
import { Game } from "./classes/Game";
import Map from "./components/Map";
import UI from "./components/UI";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const game = new Game();
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <UI game={game} />
      </ThemeProvider>
    </div>
  );
}

export default App;
