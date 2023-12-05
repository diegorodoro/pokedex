import { useState, useEffect } from "react"
import './Selection.css'
import { onSnapshot, doc, setDoc, collection } from "firebase/firestore"
import {db,auth} from "../firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Selection = ({setPage}) =>{
    const [currentUserId, setCurrentUserId] = useState(null);
    const [team, setTeam]=useState([])

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setCurrentUserId(uid)
        } 
        });
    },[setCurrentUserId])

    useEffect(() => {
        if(currentUserId!=null){
            onSnapshot(doc(db, "pokemones", currentUserId), (snapshot) => {
            if (snapshot.exists()) {
                var selection=[];
                const data = snapshot.data();

                data.team.map((pokemon)=>{
                    selection.push(pokemon)
                })
                setTeam(selection)
            }
        });
        }
    },[currentUserId]);


    function borrar(pokemon){
        const pokemonIdToRemove = pokemon.id;
        // se agrega a la variable la funcion que borra al Pokémon en base a su ID 
        const updatedTeam = team.filter(pokemon => pokemon.id !== pokemonIdToRemove);
        //setTeam(updatedTeam);      
        // Borra el Pokémon del documento en Firestore
        const docRef = doc(db, "pokemones", currentUserId);
        const updatedData = { team: updatedTeam };
        setDoc(docRef, updatedData);
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
                            <div className='b'>
                                <div className="card1">
                                        <div className="card2">
                                            <div className='selection-grid'>
                                                <div className='selection-icon'>
                                                    <img src={pokemon.image}></img>
                                                    <p>{pokemon.name}</p>
                                                    <div className='delete'>
                                                    <button onClick={()=>borrar(pokemon)}className="noselect"><span className="text">Delete</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
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