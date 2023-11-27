import { useState } from 'react'
import pikachu from './assets/pikachu.png'
import pokedex from './assets/pokedex.png'
import './App.css'
import { Pokedex } from './components/Pokedex'

function App() {
  return (
    <>
      <div>
        <a href="https://pokeapi.co/" target="_blank">
          <img src={pokedex} className="logo" alt="Vite logo" />
        </a>
      </div>
      <div>
        <Pokedex/>
      </div>
    </>
  )
}

export default App
