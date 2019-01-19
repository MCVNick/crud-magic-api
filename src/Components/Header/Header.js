//here we are saying that this will use stuff from react
import React from 'react';
//here we are importing the header style sheet
import './Header.css'

//here we are importing the filter that will be used in our header
import Filter from './Filter/Filter'

//here we are declaring a component that will take in props
//all data being used with props. will are coming from app.js
const Header = (props) => {
    //this is where we are going to return what to render onto the screen
    return (
        //first we have the parent container nav because it is a nav bar
        <nav className='headerParent'>
            {/* in there we have a header that will show one of two things if props.name is defined */}
            <h1 className='headerName'>
                {/* if props has a name and it is defined display it, otherwise say enter a name */}
                {props.name ? props.name : 'Enter A Name'}
            </h1>
            {/* here we are creating a filter and passing it a prop from app.js down a second time to filter.js */}
            <Filter handleOnChangeFn={props.handleOnChangeFn}/>
        </nav>
    )
}

//now we export header for use somewhere else
export default Header