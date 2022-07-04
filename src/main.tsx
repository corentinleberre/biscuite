import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GameView from './view/game/GameView'
import './index.css'
import MenuView from './view/menu/MenuView'
import RulesView from './view/rules/RulesView'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuView />} />
        <Route path="/game" element={<GameView />} />
        <Route path="/rules" element={<RulesView/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
