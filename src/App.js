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
      filterCat: [],
      buttons: 'catalog'
    }

    this.handleCatAddButton = this.handleCatAddButton.bind(this)
    this.handleLibButton = this.handleLibButton.bind(this)
    this.handleCatButton = this.handleCatButton.bind(this)
    this.handleCountChange = this.handleCountChange.bind(this)
    this.handleDelLibButton = this.handleDelLibButton.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleRandomButton = this.handleRandomButton.bind(this)
  }

  componentDidMount() {
    this.handleCatButton()
  }

  handleCatAddButton(id) {
    const itemObj = {
      id: id
    }

    console.log(itemObj)

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
          catalog: res.data.slice(0),
          buttons: 'catalog'
        })
      })
  }

  handleCountChange(value, id) {
    const quantityObj = {
      quantity: value
    }

    axios.put(`http://localhost:3001/api/allCards/${id}`, quantityObj)
      .then((res) => {
        this.handleLibButton()
      })
  }

  handleDelLibButton(id) {
    axios.delete(`http://localhost:3001/api/allCards/${id}`)
      .then((res) => {
        this.handleLibButton()
      })
  }

  handleFilter(value) {
    axios.get(`http://localhost:3001/api/allCards/${value}`)
      .then((res) => {
        this.setState({
          catalog: res.data.slice(0),
          buttons: 'catalog'
        })
      })
  }

  handleRandomButton() {
    axios.get(`http://localhost:3001/api/random`)
      .then((res) => {
        this.setState({
          catalog: res.data.slice(0),
          buttons: 'catalog'
        })
      })
  }

  render() {
    let catalogCards = this.state.catalog.map((card) => {
      if (card.image_uris) {
        return (
          <Card
            key={card.id}
            id={card.id}
            imageURIS={card.image_uris['large']}
            buttons='catalog'
            handleCatAddButtonFn={this.handleCatAddButton}
          />
        )
      }
      return <div key={card.id} />
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
          handleDelLibButtonFn={this.handleDelLibButton}
          count={quantity}
        />
      )
    })

    return (
      <div className="App">
        <ToastContainer />
        <Header name='Magic catalog' handleOnChangeFn={this.handleFilter} />
        <div className='sameLine'>
          <Sidebar handleLibButtonFn={this.handleLibButton} handleCatButtonFn={this.handleCatButton} />
          <main className='main'>
            {this.state.buttons === 'catalog' ? catalogCards : libraryCards}
            {this.state.buttons === 'catalog'
              ?
              <div>
                <button className='catNavButtons nextButton'>
                  Next
                </button>
                <button className='catNavButtons previousButton'>
                  Previous
                </button>
                <button className='catNavButtons randomButton' onClick={this.handleRandomButton}>
                  Random
                </button>
              </div>
              :
              <div></div>
            }
          </main>
        </div>
      </div>
    );
  }
}

export default App;
