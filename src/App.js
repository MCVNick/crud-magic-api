import React, { Component } from 'react';
import axios from 'axios'
import './reset.css'
import './App.css'

import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar'
import Card from './Components/Card/Card'

class App extends Component {
  constructor() {
    super()

    this.state = {
      cards: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/allCards')
    .then((res) => {
      for(let i = 0; i < 50; i++){
        this.state.cards.push(<Card key={i} imageURIS={res.data[i].image_uris['large']}/>)
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Header name='Magic Catelog'/>
        <div className='sameLine'>
          <Sidebar />
          <main className='main'>
            {this.state.cards}
          </main>
        </div>
      </div>
    );
  }
}

export default App;
