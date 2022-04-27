
import React from 'react'


function display(props) {
    return (    
        <div class='container'>
            <h1>function container</h1>
            i am f{ props.childern}
            { console.log(props)}      
           </div>
    )
}


export default display