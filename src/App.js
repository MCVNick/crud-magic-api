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
    this.handleCatButton = this.handleCatButton.bind( this )
    this.handleCountChange = this.handleCountChange.bind( this )
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
        let quantity = 
        res.data[i].quantity ?
        res.data[i].quantity :
        1

        newCards.push(
          <Card
            key={i}
            id={res.data[i].id}
            imageURIS={res.data[i].image_uris['large']}
            buttons='library'
            handleCountChangeFn={this.handleCountChange}
            count={quantity}
          />
        )
      }

      this.setState({
        cards: newCards
      })
    })
  }

  handleCatButton() {
    this.componentDidMount()
  }

  handleCountChange(value) {
    console.log(value)
  }

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Header name='Magic Catelog'/>
        <div className='sameLine'>
          <Sidebar handleLibButtonFn={this.handleLibButton} handleCatButtonFn={this.handleCatButton}/>
          <main className='main'>
            {this.state.cards}
          </main>
        </div>
      </div>
    );
  }
}

export default App;
