//here we are saying that this will inherit stuff from react
import React from 'react'
//here we are importing the sidebar styling
import './Sidebar.css'

//this is a funcitonal component that will take in props
//on props will be data that is passed in from app.js
const Sidebar = (props) => {
    //we will return a aside element stating that this element should be on the side of our content
    return (
        //this is where we give it a class name of asideParent for styling
        //again handlers come from the props
        <aside className='asideParent'>
            {/* in it we will have two buttons */}
            {/* the first which is going to be the library button */}
            {/* on click we are calling the handle library button function from the props */}
            <button className='asideButton asideLibButton' onClick={() => props.handleLibButtonFn()}>
                Your Library
            </button>
            {/* and the second which is going to be the catelog button */}
            {/* on click we are calling the handle catalog button function from the props */}
            <button className='asideButton asideCatButton' onClick={() => props.handleCatButtonFn()}>
                Catalog
            </button>
        </aside>
    )
}

//this is where we are exporting the sidebar so that we can get it somewhere else
export default Sidebar