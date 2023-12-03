import { useState } from 'react'
import './App.css'
import {Nav_bar} from './components/Nav_bar'
import { Pokedex } from './components/Pokedex'
import {Selection} from './components/Selection'

function App() {
  const[page,setPage]=useState(1);
  const[selected,setSelected]=useState([]);


  const pagination =(page)=>{
    switch (page) {
      case 1:
        return(<Pokedex key={"pokedex"} selected={selected} setSelected={setSelected}/>)
      
      case 2:
        return(<Selection key={"selection"} team={selected}/>)
      
      default:
          
      break;
     }
  }

  return (
    <>
      <div>
        <Nav_bar key={0} page={setPage}/>
      </div>
      <div>
        {pagination(page)}      
      </div>
      
    </>
  )
}

export default App
