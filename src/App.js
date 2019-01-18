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
      catalog: [],
      library: [],
      buttons: 'catalog',
      crap: ''
    }

    this.handleCatAddButton = this.handleCatAddButton.bind( this )
    this.handleLibButton = this.handleLibButton.bind( this )
    this.handleCatButton = this.handleCatButton.bind( this )
    this.handleCountChange = this.handleCountChange.bind( this )
  }

  componentDidMount() {
    this.handleCatButton()
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
      this.setState({
        library: res.data,
        buttons: 'library'
      })
    })
  }

  handleCatButton() {
    axios.get('http://localhost:3001/api/allCards')
    .then((res) => {
      this.setState({
        catalog: res.data.slice(0,50),
        buttons: 'catalog'
      })
    })
  }

  handleCountChange(value,id) {
    const quantityObj = {
      quantity: value
    }

    axios.put(`http://localhost:3001/api/allCards/${id}`, quantityObj)
    .then((res) => {
      this.handleLibButton()
    })
  }

  render() {
    let catalogCards = this.state.catalog.map((card) => {
      return (
        <Card
          key={card.id}
          id={card.id}
          imageURIS={card.image_uris['large']}
          buttons='catalog'
          handleCatAddButtonFn={this.handleCatAddButton}
        />
      )
    })

    let libraryCards = this.state.library.map((card) => {
      let quantity = card.quantity ?
                     card.quantity :
                     1

      return (
          <Card
            key={card.id}
            id={card.id}
            imageURIS={card.image_uris['large']}
            buttons='library'
            handleCountChangeFn={this.handleCountChange}
            count={quantity}
          />
      )
    })

    return (
      <div className="App">
        <ToastContainer />
        <Header name='Magic catalog'/>
        <div className='sameLine'>
          <Sidebar handleLibButtonFn={this.handleLibButton} handleCatButtonFn={this.handleCatButton}/>
          <main className='main'>
            {this.state.buttons === 'catalog' ? catalogCards : libraryCards}
          </main>
        </div>
      </div>
    );
  }
}

export default App;
