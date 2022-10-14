import React, { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import UI from "./components/UI";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Test from "./components/Test";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <UI />
        {/* <Test /> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
