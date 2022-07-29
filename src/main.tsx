import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import BiscuiteGameView from "./view/game/biscuite/BiscuiteGameView";
import FreeGameView from "./view/game/free/FreeGameView";
import MenuView from "./view/menu/MenuView";
import RulesView from "./view/rules/RulesView";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuView />} />
        <Route path="/game/biscuite" element={<BiscuiteGameView />} />
        <Route path="/game/free" element={<FreeGameView />} />
        <Route path="/rules" element={<RulesView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
