import React from 'react'
import './Selection.css'

export const Selection = ({team}) =>{
    return(
            <div>
                {
                    team.map((a)=>{
                        return(
                            <div class="s">
                            <div class="card-selection">
                            <div class="bg">
                                <div className='selection-grid'>
                                    <div className="selection-icon">
                                        <img src={a.image}></img>
                                        <p>{a.name}</p>
                                    </div>
                                <div>
                                    <p>aa</p>
                                </div>
                                </div>
                                
                            </div>
                            {/* no tocar */}
                            <div class="blob">
                            </div>
                            </div>
        
                        </div>
                        )
                    })
                }
            
            </div>
        
        
        
    )
}