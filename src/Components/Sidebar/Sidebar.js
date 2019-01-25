//here we are saying that this will inherit stuff from react
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

//here we are importing the sidebar styling
import './Sidebar.css'

class Sidebar extends Component {
    handleSidebarButtonClick(e) {
        e.preventDefault();
    }

    render() {
        //we will return a aside element stating that this element should be on the side of our content
        return (
            //this is where we give it a class name of asideParent for styling
            //again handlers come from the props
            <aside className='asideParent'>
                {/* in it we will have two buttons */}
                {/* the first which is going to be the library button */}
                {/* on click we are calling the handle library button function from the props */}
                <Link to='/' onClick={(e) => this.handleSidebarButtonClick(e)}>
                    <button className='asideButton asideLibButton'>
                        Your Library
                    </button>
                </Link>
                {/* and the second which is going to be the catelog button */}
                {/* on click we are calling the handle catalog button function from the props */}
                <Link to='/catalog' onClick={this.handleSidebarButtonClick}>
                    <button className='asideButton asideLibButton'>
                        Catalog
                    </button>
                </Link>
            </aside>
        )
    }
}

//this is where we are exporting the sidebar so that we can get it somewhere else
export default Sidebar