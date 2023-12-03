import React from 'react'
import './Selection.css'

export const Selection = ({team,setTeam, setPage}) =>{
    function borrar(pokemon){
        setTeam(prev => prev.filter(team => team !== pokemon ))        
    }

    return(
        <div className='back'>
            {
            team.length==0?
            <div className='alert-pad'>
                <div className='alert-design'>
                    <div>
                        <h1>No hay pokemones seleccionados</h1>
                    </div>
                    <div>
                        <h3>Por favor seleccione a sus pokemones en el menú principal</h3>
                    </div>
                    <div style={{textAlign:'center', paddingTop:"50px"}}>
                        <button onClick={()=>setPage(1)}>Return home</button>
                    </div>
                </div>
            </div>
            :
            <div className='aa'>
                <h1>Equipo seleccionado</h1>
                {
                    team.map((pokemon)=>{
                        return(
                            <div >
                                <div class="card1">
                                        <div class="card2">
                                            <div className='selection-grid'>
                                                <div className='selection-icon'>
                                                    <img src={pokemon.image}></img>
                                                    <p>{pokemon.name}</p>
                                                    <div className='delete'>
                                                        <button onClick={()=>borrar(pokemon)} class="noselect">
                                                            <span class="text">Delete</span>
                                                            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" 
                                                            width="24" height="24" viewBox="0 0 24 24">
                                                                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 
                                                                8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 
                                                                8.237-8.318 8.285 8.203z"></path></svg></span></button>
                                                    </div>
                                                </div>
                                                <div className='info-grid'>
                                                    <div>
                                                        <p><b>Id</b></p>
                                                    </div>
                                                    <div>
                                                        <p>{pokemon.id}</p>
                                                    </div>
                                
                                                    <div>
                                                        <p><b>Types</b></p>
                                                    </div>
                                                    <div>
                                                        {
                                                            pokemon.types.map((a)=>{
                                                                return(
                                                                    <p>{a.type.name}</p>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                
                                                    <div>
                                                        <p><b>Weigth</b></p>
                                                    </div>
                                                    <div>
                                                        <p>{pokemon.weight}</p>
                                                    </div>
                                
                                                    <div>
                                                        <p><b>Height</b></p>
                                                    </div>
                                                    <div>
                                                        <p>{pokemon.height}</p>
                                                    </div>
                                
                                                    <div>
                                                        <p><b>Abilities</b></p>
                                                    </div>
                                                    <div>
                                                        {
                                                            pokemon.abilities.map((a)=>{
                                                            return(<p id={a.ability.name}>{a.ability.name}</p>)
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ div>
                            )
                        })
                    }
            
                </div>
            }
        </div>
    )
}