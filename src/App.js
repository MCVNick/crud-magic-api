import React, { Component } from 'react';
import axios from 'axios'
import './reset.css'
import './App.css'

import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header name='Magic Catelog'/>
        <Sidebar />
      </div>
    );
  }
}

export default App;
