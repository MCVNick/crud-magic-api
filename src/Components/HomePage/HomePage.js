//importing essential things to be used later in the website
import React from 'react'
import { Link } from 'react-router-dom'

//importing style
import './HomePage.css'

const HomePage = (props) => {
    return (
        <div>
            {/* the headers displaying on the middle of the home page */}
            <h1 className='homePageHeader'>Welcome to the magic catalog</h1>
            <h3 className='homePageSubHeader'>Login if you wish for your library to be saved</h3>
            {/* the three boxes that appear on the home page */}
            {/* each box has a link to another part of the website */}
            <div className='homeBoxesParent'>
                <Link to='/catalog' className='homeBoxChild'>
                    <p className='homeBoxChildWords'>
                        Catalog
                    </p>
                </Link>
                <Link to='/' className='homeBoxChild'>
                    <p className='homeBoxChildWords'>
                        Login
                    </p>
                </Link>
                <Link to='/' className='homeBoxChild'>
                    <p className='homeBoxChildWords'>
                        Library
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default HomePage