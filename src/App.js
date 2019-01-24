//importing important things that will be used later in the app
import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom'

//the other styling for this app. Start with a reset
import './reset.css'
import './App.css'

//importing some components that will be seen on all pages
import Header from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'

//importing all the routes we will be changing between
import routes from './routes'

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
              {/* This is everything else that will be changing on the webpage */}
              {/* {routes} */}
            </main>
          </div>
        </div>
      </Router>
    )
  }
}


export default App;
