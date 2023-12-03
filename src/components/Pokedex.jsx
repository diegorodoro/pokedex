import { useState, useEffect } from "react"
import axios from 'axios'
import { Pokemon } from "./Pokemon"
import config from '../firebase/firebaseConfig'
import { collection, onSnapshot, doc, setDoc } from "firebase/firestore"
import { getDatabase, ref, set } from "firebase/database";
import Button from 'react-bootstrap/Button';
import {Team} from './Team';
import './Pokedex.css'
import Alert from 'react-bootstrap/Alert';

export const Pokedex = ({selected,setSelected}) =>{
    const [pokemones, setPokemones]=useState([])
    const [team, setTeam]=useState(selected)
    const [page, setPage]=useState(1)
    const [warning, setWarning] = useState(false);
    const [danger, setDanger] = useState(false);

    const url=`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page-1)*20}`

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
                        sprites: pokemon.sprites,
                        abilities: pokemon.abilities,
                        height:pokemon.height
                    }
                })
                //llamamos el setPokemones con el useState
                setPokemones(pokemonData)
            })
        })
        //esto se pone para que se deje de ejecutar cuando se mande a llamar setPokemones
    }, [setPokemones,page])


    //Se recupera informacion de firebase
//     useEffect(()=>{
//         const unsub = onSnapshot(doc(db, "team", "principal"), (snapshot)=>{
//             if(snapshot.exists()){
//                 const data=snapshot.data()
//                 Object.keys(data).map(d=>{
//                     console.log(data[d])
//                 })
//             }
//         })
//     },[setTeam])

    useEffect(()=>{
        team.map((a)=>{
            setDoc(doc(config, "pokemones", a.name), {
                name:a.name,
                sprite:a.image

            })
        })
        team.map((a)=>{
            console.log(a.name)
        })
        console.log("-----------")

        

    })

    function add_team(pokemon){
        // aqui se guarda equipo
        if(team.length<6 && !team.find((a)=>a.name==pokemon.name)){ 
            setTeam(a=>[...a,pokemon])
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
        // aqui se borra equipo
        setTeam(prev => prev.filter(team => team !== pokemon ))        
    }
    
    useEffect(()=>{
        setSelected(team)
    },[team])
    
    
    return(
        <div>
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
                        <div >
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
                            <Button type="submit" onClick={()=>setPage(page-1)}>Anterior</Button>
                         :
                            <Button variant="secondary" type="submit" disabled>Anterior</Button>
                        }
                        <Button type="submit" onClick={()=>setPage(page+1)}>Siguiente</Button>
                 </div>  
            </ div>

        </div>
    )
}
