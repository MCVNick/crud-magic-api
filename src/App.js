import React, { Component } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './reset.css'
import './App.css'

import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar'
import Card from './Components/Card/Card'

class App extends Component {
  constructor() {
    super()

    this.state = {
      cards: [],
      buttons: 'catelog'
    }

    this.handleCatAddButton = this.handleCatAddButton.bind( this )
    this.handleLibButton = this.handleLibButton.bind( this )
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/allCards')
    .then((res) => {
      let newCards = []

      for(let i = 0; i < 50; i++){
        newCards.push(
          <Card
            key={i}
            id={res.data[i].id}
            imageURIS={res.data[i].image_uris['large']}
            buttons='catelog'
            handleCatAddButtonFn={this.handleCatAddButton}
          />
        )
      }

      this.setState({
        cards: newCards
      })
    })
  }

  handleCatAddButton(id) {
    const itemObj = {
      id: id
    }

    axios.post('http://localhost:3001/api/allCards', itemObj)
    .then((res) => {
      toast('Added to library')
    })
  }

  handleLibButton() {
    axios.get('http://localhost:3001/api/yourCards')
    .then((res) => {
      let newCards = []

      for(let i = 0; i < res.data.length; i++){
        newCards.push(
          <Card
            key={i}
            id={res.data[i].id}
            imageURIS={res.data[i].image_uris['large']}
            buttons='library'
          />
        )
      }

      this.setState({
        cards: newCards
      })
    })
  }

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Header name='Magic Catelog'/>
        <div className='sameLine'>
          <Sidebar handleLibButtonFn={this.handleLibButton}/>
          <main className='main'>
            {this.state.cards}
          </main>
        </div>
      </div>
    );
  }
}

export default App;
