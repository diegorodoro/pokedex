import React from 'react'
import equis from '../assets/equis.png'
import './Team.css'

export const Team = ({team, borrar}) =>{
    return(
        < >
        <div className="team">
            <div>
                <img src={equis} onClick={()=>borrar(team)}></img>
            </div>
            <h3 >{team.name}</h3>
        </div>
        <img className="team-pokemon" src={team.image} alt=""/> 
        </>
    )
}