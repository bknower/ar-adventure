import React, { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import UI from "./components/UI";
function App() {
  return (
    <div className="App">
      <Map />
      <UI />
    </div>
  );
}

export default App;
