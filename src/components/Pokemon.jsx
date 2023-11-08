import React from 'react'

export const Pokemon = ({pokemon, url}) =>{
    return(
        <>
            <h3>{pokemon.name}</h3>
            {console.log(2222)}
            <img src={url} className="logo"/>
        </>
    )
}