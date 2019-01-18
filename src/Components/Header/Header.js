import React from 'react';
import './Header.css'

import Filter from './Filter/Filter'

const Header = (props) => {
    return (
        <div className='headerParent'>
            <h1 className='headerName'>
                {props.name ? props.name : 'Enter A Name'}
            </h1>
            <Filter />
        </div>
    )
}

export default Header