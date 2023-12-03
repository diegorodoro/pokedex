import React from 'react'
import './Nav_bar.css'
import pokedex from '../assets/pokedex.png'
import go from '../assets/pokego.png'

export const Nav_bar = ({page}) =>{
    return(
        <>
       <nav className="menu-container">
        <input type="checkbox" aria-label="Toggle menu" />
        <span></span>
        <span></span>
        <span></span>

        <a href="#" className="menu-logo">
            <img src={go} />
        </a>

        <div className="menu">
            <ul>
            <li onClick={()=>page(1)}>
                Home
            </li>
            <li onClick={()=>page(2)}>
                Team
            </li>
           
            </ul>

            <ul>
            <li>
                <a href="#signup">
                Sign-up
                </a>
            </li>
            <li>
                <a href="#login">
                Login
                </a>
            </li>
            </ul>
        </div>
        </nav>
        </>
    )
}     
        
        
        
