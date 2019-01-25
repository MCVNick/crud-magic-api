//importing important things that will be used later in the app
import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//the other styling for this app. Start with a reset
import './reset.css'
import './App.css'

//importing some components that will be seen on all pages
import Header from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'

//importing all the routes we will be changing between
import routes from './routes'

//importing image
import myImg from './images/crud-magic-app-background.jpg'

//this is the app component that holds all the things on the website
class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          {/* Creating a header with the name of Magic Catalog */}
          {/* It will be on every page */}
          <Header name='Magic Catalog' />
          <div className='mainParent'>
            {/* Creating the sidebar that will also be on every page */}
            <Sidebar />
            <main className='main'>
              <img className='mainImg' src={myImg} alt='Background' />
              {/* This is everything else that will be changing on the webpage */}
              <div className='mainContent'>
                {routes}
              </div>
            </main>
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover={false}
          />
        </div>
      </Router>
    )
  }
}


export default App;
