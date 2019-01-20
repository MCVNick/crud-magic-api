//here we are importing things from react
import React from 'react'
//here we are importing the styling for the catalog buttons
import './CatButtons.css'

//here we are declaring catbuttons to take in props
const CatButtons = (props) => {
    //this is what will be returned to react
    return (
        //we are returning a div
        <div>
            {/* with a button on it that says add */}
            {/* if the user clicks on the button we will pass in the id so that we can add the */}
            {/* card of specified id */}
            {/* this again is coming from app.js just passed through as props */}
            <button className='button addButton' onClick={() => props.handleCatAddButtonFn(props.id)}>
                +
            </button>
        </div>
    )
}

//here we are exporting for use elseware
export default CatButtons