import { useState, useEffect } from "react"
import axios from 'axios'
import { Pokemon } from "./Pokemon"

export const Pokedex = () =>{
    const [pokemones, setPokemones]=useState([])

    const url="https://pokeapi.co/api/v2/pokemon"

    useEffect(()=>{
        //recuperamos los datos
        axios.get(url).then((response)=>{
            //jalamos del api los pokemones, solo tiene name y url de los detalles del pokemon
            const pokemonList=response.data.results
            //jalamos los url de cada pokemon individual con axios
            const pokemonPromises=pokemonList.map(pokemon=>{
                return axios.get(pokemon.url)
            })
            //esta funcion espera a que reciba los datos 
            Promise.all(pokemonPromises).then(pokemonResponses=>{
                //aqui se almacena una lista con los atributos que queremos
                const pokemonData = pokemonResponses.map(res=>{
                    //res es el recorrido de pokemonResponses
                    //res tiene todos los datos de los detalles de los pokemones
                    const pokemon=res.data
                    //retornamos los pokemones con la funcion de "...", similar a append en python
                    return {
                        //guardamos en pokemon, como si fuera diccionario
                        ...pokemon,
                        image: pokemon.sprites.front_default,
                        sprites: pokemon.sprites
                    }
                })
                //llamamos el setPokemones con el useState
                setPokemones(pokemonData)
            })
        })
        //esto se pone para que se deje de ejecutar cuando se mande a llamar setPokemones
    }, [setPokemones])
    
    return(
        <div>
            {pokemones.map((pokemon)=>{
                return <Pokemon key={pokemon.id} pokemon={pokemon}/>
            })}
        </div>
    )
}
