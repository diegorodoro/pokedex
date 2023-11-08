import { useState, useEffect } from "react"
import axios from 'axios'
import { Pokemon } from "./Pokemon"

export const Pokedex = () =>{
    const [pokemones, setPokemones]=useState([])

    const url="https://pokeapi.co/api/v2/pokemon"

    useEffect(()=>{
        axios.get(url).then((response)=>{
            setPokemones(response.data.results)
        })
    }, [setPokemones])

    var cont=0;

    return(
        <div>
            {pokemones.map((pokemon)=>{
                cont=cont+1;
                return <Pokemon key={pokemon.id} pokemon={pokemon} url={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+String(cont)+".png"}/>
            })}
        </div>
    )
}
