import React, { useState } from "react";
import "./App.css";
import { Game } from "./classes/Game";
import Map from "./components/Map";
import UI from "./components/UI";
function App() {
  const game = new Game();
  return (
    <div className="App">
      <UI game={game} />
    </div>
  );
}

export default App;
