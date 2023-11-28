import React from 'react'
import equis from '../assets/equis.png'
import './Team.css'

export const Team = ({team, borrar}) =>{
    return(
        
        <div className="team">
            <div className='grid'>
                <div>
                    <img className="equis" src={equis} alt=""/> 
                </div>
                <div>
                    <h3 >{team.name}</h3>
                </div>
                <div>
                    <img className="team-pokemon" src={team.image} alt=""/> 
                </div>
            </div>
            
        </div>
        
    )
}