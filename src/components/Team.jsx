import React from 'react'
import equis from '../assets/equis.png'
import './Team.css'

export const Team = ({team, borrar}) =>{
    return(
        
        <div className="team">
            <div className='grid'>
                <div className="equis">
                    <img src={equis} onClick={borrar}/> 
                </div>
                <div>
                    <h3 >{team.name}</h3>
                </div>
                <div className='icon'>
                    <img  src={team.image} /> 
                </div>
            </div>
            
        </div>
        
    )
}