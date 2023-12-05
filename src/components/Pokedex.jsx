import { useState, useEffect } from "react"
import axios from 'axios'
import { Pokemon } from "./Pokemon"
import { onSnapshot, doc, setDoc } from "firebase/firestore"
import {db,auth} from "../firebase/firebaseConfig";
import {Team} from './Team';
import './Pokedex.css'
import Alert from 'react-bootstrap/Alert';
import { getAuth, onAuthStateChanged } from "firebase/auth";

//import App, { userId } from '../App';

export const Pokedex = () =>{
    const [pokemones, setPokemones]=useState([])
    const [team, setTeam]=useState([])
    const [page, setPage]=useState(1)
    const [warning, setWarning] = useState(false);
    const [danger, setDanger] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    const url=`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page-1)*20}`

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setCurrentUserId(uid)
        }
        });
    },[setCurrentUserId])

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
                        name:pokemon.name,
                        id:pokemon.id,
                        image: pokemon.sprites.front_default,
                        abilities: pokemon.abilities,
                        height:pokemon.height,
                        types:pokemon.types,
                        weight:pokemon.weight
                        
                    }
                })
                //llamamos el setPokemones con el useState
                setPokemones(pokemonData)
            })
        })
        //esto se pone para que se deje de ejecutar cuando se mande a llamar setPokemones
    }, [setPokemones,page])


    useEffect(() => {
        if(currentUserId!=null){
            onSnapshot(doc(db, "pokemones", currentUserId), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                setTeam(data.team || []);
            }
        });
        }
    },[currentUserId]);

    function add_team(pokemon){
        const pokemonParams = {
            name:pokemon.name,
            id:pokemon.id,
            image: pokemon.sprites.front_default,
            abilities: pokemon.abilities,
            height:pokemon.height,
            types:pokemon.types,
            weight:pokemon.weight
        };
        // aqui se guarda equipo
        if(team.length<6 && !team.find((a)=>a.name==pokemon.name)){ 
            // setTeam(a=>[...a,pokemon])
            currentUserId!=null && setDoc(doc(db, "pokemones", currentUserId), { team: [...team, pokemonParams] });

        }
        if(team.length<6 && team.find((a)=>a.name==pokemon.name)){ 
            setWarning(true)
        }
        else if(team.length===6 ){
            setDanger(true)
            if(team.find((a)=>a.name==pokemon.name)){
                setWarning(true)
            }
        }
    }
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
        <div style={{backgroundColor:"white"}}>
            {/*alertas en caso de evento */}
            <div className="Alert">
                {
                        warning===true && 
                        <Alert variant="warning" onClose={() => setWarning(false)} dismissible>
                            <Alert.Heading>Pokemon ya agregado!</Alert.Heading>
                            <p>
                                Este pokemon ya ha sido agregado, por favor eliga otro.
                            </p>
                        </Alert> 
                }
                {
                        danger===true && 
                        <Alert variant="danger" onClose={() => setDanger(false)} dismissible>
                            <Alert.Heading>Limite de pokemones excedido</Alert.Heading>
                            <p>
                                El limite de pokemones es de 6.
                            </p>
                        </Alert> 
                }
            </ div>

            {team.length==0?
                <div style={{color:"black", textAlign:"center", paddingTop:"150px",paddingBottom:"10px"}}>
                    <h1>Haga click en la tarjeta para seleccionar a un pokemon</h1>
                </div>
                :
                <div style={{color:"black", textAlign:"center", paddingTop:"150px",paddingBottom:"10px"}}>
                    <h1>Equipo seleccionado</h1>
                </div>
            }

            {/*se imprime equipo */}
            <div className="team-grid">
                {    
                    team.length>0 && 
                        team.map((pokemon)=>{
                         return(
                             <Team team={pokemon} borrar={()=>borrar(pokemon)}/>
                         )
                        })
                }
            </div>

            {/*lista de los pokemones */}
            <div className="pokemon-grid">
                {/* aqui se mapea todos los pokemones */}
                {pokemones.map((pokemon)=>{
                    return(    
                        <div>
                            {team.find((a)=>a.name==pokemon.name)
                            ?
                            <div onClick={()=>add_team(pokemon)}>
                                <Pokemon key={pokemon.id} pokemon={pokemon}
                                black_white={"choosed"}/>
                            </div>
                            :
                            <div onClick={()=>add_team(pokemon)}>
                                <Pokemon key={pokemon.id} pokemon={pokemon}
                                black_white={""}/>
                            </div>
                            }                            
                            
                        </div>
                    )
                })}
            </ div>

            {/*botones paginas */}
            <div style={{padding:"40px"}}>
                <div className="botones">
                        {
                         page!=1 ? 
                            <button id="active" onClick={()=>setPage(page-1)}>Anterior</button>
                         :
                            <button id="inactive" >Anterior</button>
                        }
                        <button id="active" onClick={()=>setPage(page+1)}>Siguiente</button>
                 </div>  
            </ div>

        </div>
    )
}