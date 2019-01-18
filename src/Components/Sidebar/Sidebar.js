import React from 'react'
import './Sidebar.css'

const Sidebar = (props) => {
    return (
        <aside className='asideParent'>
            <button>
                Your Library
            </button>
            <button>
                Catalog
            </button>
        </aside>
    )
}

export default Sidebar