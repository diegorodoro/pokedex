import { useState } from 'react'
import pokedex from './assets/pokedex.png'
import './App.css'
import { Pokedex } from './components/Pokedex'
import {Nav_bar} from './components/Nav_bar'

function App() {
  const[page,setPage]=useState(1);
  return (
    <>
      <div>
        <Nav_bar page={setPage}/>
      </div>
      {
        page===1&&<Pokedex/>

      }
    </>
  )
}

export default App
