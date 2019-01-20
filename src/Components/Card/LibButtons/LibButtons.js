//here we are importing the things from react
import React from 'react'
//here we are importing the styling for the library buttons
import './LibButtons.css'

//here we are declaring a functional component of library butons that takes in props from card.js from app.js
const LibButtons = (props) => {
    //this is what we will return to react to be displayed
    return (
        //we are returning a div
        <div>
            {/* on that div we have a p tag that says count */}
            <p className='count'>Count:</p>
            {/* we also have an imput which will take a type number only */}
            {/* on the change of the textbox we will update the count by sending stuff to */}
            {/* handlecountchangefn from card.js from app.js */}
            {/* we will then set the value of the card equal to whatever is in the box */}
            <input
                className='inputCount'
                type='number'
                onChange={(e) => props.handleCountChangeFn(e.target.value, props.id)}
                value={props.count} />
            {/* we have another button that is delete card it will */}
            {/* again it takes in a function from card.js from app.js */}
            {/* FIXME - change what is on the button possibly an image instead */}
            <button className='deleteCard' onClick={() => props.handleDelLibButtonFn(props.id)}>♲</button>
        </div>
    )
}

//here we are exporting for use elseware
export default LibButtons