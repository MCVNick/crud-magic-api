import React from 'react'
import './HomePage.css'

const HomePage = (props) => {
    return (
        <div>
            <h1 className='homePageHeader'>Welcome to the magic catalog</h1>
            <h3 className='homePageSubHeader'>Login if you wish for your library to be saved</h3>
            <div className='homeBoxesParent'>
                <div className='homeBoxChild'>
                    <p className='homeBoxChildWords'>
                        Catalog
                    </p>
                </div>
                <div className='homeBoxChild'>
                    <p className='homeBoxChildWords'>
                        Login
                    </p>
                </div>
                <div className='homeBoxChild'>
                    <p className='homeBoxChildWords'>
                        Library
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HomePage