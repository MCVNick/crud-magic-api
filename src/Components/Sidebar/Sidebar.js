import React from 'react'
import './Sidebar.css'

const Sidebar = (props) => {
    return (
        <aside className='asideParent'>
            <button className='button1' onClick={() => props.handleLibButtonFn()}>
                Your Library
            </button>
            <button className='button2'>
                Catalog
            </button>
        </aside>
    )
}

export default Sidebar