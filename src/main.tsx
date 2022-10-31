import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import GameMenuView from "./view/game-menu/GameMenuView";
import BiscuiteGameView from "./view/game/biscuite/BiscuiteGameView";
import FreeGameView from "./view/game/free/FreeGameView";
import MenuView from "./view/menu/MenuView";
import RulesView from "./view/rules/RulesView";
import SplashscreenView from "./view/splashscreen/Splashscreen";

//  <!-- <Route path="/" element={<MenuView />} /> -->

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashscreenView />} />
        <Route path="/menu" element={<MenuView />} />
        <Route path="/game/menu" element={<GameMenuView />} />
        <Route path="/game/biscuite" element={<BiscuiteGameView />} />
        <Route path="/game/free" element={<FreeGameView />} />
        <Route path="/rules" element={<RulesView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
