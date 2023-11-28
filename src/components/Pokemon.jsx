import React from 'react'
import './Pokemon.css'

export const Pokemon = ({pokemon,black_white, add}) =>{
    return(
        <div className="pokemon-container" onClick={add}>
            <div className="pokemon">
                <div className="front-content">
                    <h3>#{pokemon.id}</h3>
                    <p className={black_white===true ? "choosed":""}>{pokemon.name}</p>
                    <img className={black_white===true ? "choosed":""}src={pokemon.image} alt=""/>
                </div>

                <div className="content">
                    <div className='conteiner-grid'>
                        <p className="heading">{pokemon.name}</p>
                        <img className={black_white===true ? "choosed":""}src={pokemon.image} alt=""/>
                    </ div>

                    <div className='conteiner-grid'>
                        <p><b>Weight</b></p>
                        <p>{pokemon.weight}</p>
                    </div>

                    <div className='conteiner-grid'>
                        <p><b>Height</b></p>
                        <p>{pokemon.height}</p>
                    </div>

                    <div className='conteiner-grid'>
                        <div>
                            <p><b>Abilities</b></p>
                        </div>
                       <div>
                         {
                             pokemon.abilities.map((a)=>{
                                 return(<p>{a.ability.name}</p>)
                             })
                         }
                       </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}