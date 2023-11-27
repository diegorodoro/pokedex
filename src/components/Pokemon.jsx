import React from 'react'

export const Pokemon = ({pokemon}) =>{
    return(
        <>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.image} alt=""/>
        </>
    )
}