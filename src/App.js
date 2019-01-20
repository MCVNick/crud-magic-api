//the main app for functionality of the website
import React, { Component } from 'react';
//for hitting server of cards
import axios from 'axios'
//indicates to the user on the side.
import { ToastContainer, toast } from 'react-toastify';
//FIXME - the styling for toastify, I want my own style for it
import 'react-toastify/dist/ReactToastify.css';

//the other styling for this app. Start with a reset
import './reset.css'
import './App.css'

//importing other components from these files to be used on the app
import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar'
import Card from './Components/Card/Card'

//this is the app component that holds all the things on the website
class App extends Component {
  //a simple constructor inheriting stuff from component
  constructor() {
    //this is how we inherit stuff from component
    super()

    //these are all the things that will be handled by the app
    this.state = {
      //catalog holds up to 175 cards (filters all non english cards out)
      catalog: [],
      //library holds all the cards you end up adding to your library
      library: [],
      //filter catalog will hold up to 175 filtered cards of the name you type
      filterCat: [],
      //this is the variable that tells us what buttons we should show on the screen
      //may need fixed if I decide to have more than just two things on sidebar
      buttons: 'catalog',
      //this will handle what page we are on currently
      page: 1
    }

    //here we are binding each of the functions so that they work when calling to the state
    this.handleCatAddButton = this.handleCatAddButton.bind(this)
    this.handleLibButton = this.handleLibButton.bind(this)
    this.handleCatButton = this.handleCatButton.bind(this)
    this.handleCountChange = this.handleCountChange.bind(this)
    this.handleDelLibButton = this.handleDelLibButton.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleRandomButton = this.handleRandomButton.bind(this)
    this.handleNextButton = this.handleNextButton.bind(this)
    this.handlePreviousButton = this.handlePreviousButton.bind(this)
  }

  /*
   * Each axios call is also processed in the back end
   * if a call doesn't make sense see the server/index.js or server/controller.js for details
   */

  //when the page starts up (componentDidMount) takes effect
  //this will call the handle method as though you clicked on catalog
  componentDidMount() {
    //this is where the call is made
    //that will be described later down, but it will basically pull up the catalog on state
    this.handleCatButton()
  }

  //this is what will happen when we click the add button on a card
  //we take in the id of the card first off
  handleCatAddButton(id) {
    //now we create an object paramater taht we are going to send into axios
    const itemObj = {
      //here we are saying that the id property is equal to the id we past in
      //the left is the id on the object, and the right is the one we pass in
      id: id
    }

    //this is where we make a post call from axios.
    //here it says that we are taking the object and finding the item with that id
    //once that id is found we will then post or add that card to our library
    //then we will do nothing else but send a message to the viewer
    axios.post('http://localhost:3001/api/allCards', itemObj)
      .then((res) => {
        //this is the message that will apear on the side
        //we are using toast because it is what we imported
        toast.success('Added to library')
      })
  }

  //this is where we handle if the user clicks the library button
  handleLibButton() {
    //we send an axios request to the specified url to get your cards
    //this url is different from the previous one which was all cards
    //also instead of posting anything we are just getting stuff to display
    axios.get('http://localhost:3001/api/yourCards')
      .then((res) => {
        //this is where we set state, items must be set this way when using react
        this.setState({
          //here we are saying the library on state now is equal to the data we got from axios
          //res is the results of hitting a git to the specified url
          //data is the data we care about from the result
          library: res.data,
          //we also set the buttons to be library instead of catelog
          //this logic is used to decide which buttons are displayed on each card
          buttons: 'library'
        })
        //telling the viewer that they are now in their library
        toast.info('Now in library')
      })
  }

  //this is where we handle what happens if they click on the catalog button
  //remember that this is also called when the web page loads
  handleCatButton() {
    //first we send an axios get request to the specified url
    //note that this one is all cards not your cards
    axios.get('http://localhost:3001/api/allCards')
      .then((res) => {
        //then we change the state of catalog and buttons
        this.setState({
          //the catalog now is equal to all the cards that were returned from res.data
          //the splice was going to be used to define how many cards I wanted to show
          //however, I could propbably remove splice and nothing would happen
          catalog: res.data.slice(0),
          //here we are showing catalog buttons again
          buttons: 'catalog'
        })
        //telling the viewer we are now in catelog
        toast.info('Now in catalog')
      })
  }

  //here we are defining what happens when we change the count
  //FIXME - add a verify option if the user clicks delete card or makes it 0 or less
  //we are taking in a value which is the new card count
  //we are taking in an id to know what card we are changing
  handleCountChange(value, id) {
    //first we create an quantity object, which will hold only the new quantity
    const quantityObj = {
      //quantity is the ammount of cards, and value is the new ammount we are passing in
      quantity: value
    }

    //we then send a put request to axios (a request to update data)
    //we pass into the paramater what id we are updating, and then the object with the new ammount
    //this should then be taken care of by the back end to update the quantity of given id
    axios.put(`http://localhost:3001/api/allCards/${id}`, quantityObj)
      .then((res) => {
        //then we call the handle library button because we are in the library and need to update
        //what the viewer is looking at
        this.handleLibButton()
      })
  }

  //this is where we handle if the user hits the delete button on a library card
  //we pass it in an id so that we know what card is being deleted
  handleDelLibButton(id) {
    //now we are making an axios delete request which should delete the card of the given id
    axios.delete(`http://localhost:3001/api/allCards/${id}`)
      .then((res) => {
        //we then call handle library button because we need to update the viewers stuff
        this.handleLibButton()
      })
  }

  //this is how we handle the filter option
  //here we pass in a value which is how we know what to filter
  //FIXME - make a more complicated filter option for those who want to use it
  handleFilter(value) {
    //telling the viewer that we are working on their request
    toast.warn('Searching')
    //we will make an axios get request to the server and pass it in a value so that it knows
    //what to filter
    //if we pass in Swa it will return up to 175 cards that have swa in the name
    //case is ignored on backend
    axios.get(`http://localhost:3001/api/allCards/${value}`)
      .then((res) => {
        //we then update the state
        this.setState({
          //the catalog is now equal to all the cards that come back from results
          //data once again is the cards from results
          //also splice was to define how many cards appear, but I no longer use splice
          //the splice could be removed and do nothing
          catalog: res.data.slice(0),
          //now we update the buttons to catalog buttons because we will no longer be in library
          buttons: 'catalog'
        })
        toast.success('Success')
      })
  }

  //this is what is called when the viewer clicks on the random button
  handleRandomButton() {
    //we send to the viewer that we are getting their data
    toast.warn('Getting Data')

    //we send a get request to the given link
    axios.get(`http://localhost:3001/api/random`)
      .then((res) => {
        //then we set the state with the results that come in
        this.setState({
          //splice is not needed anymore I can use it to define how many cards appear
          //that being said the back end will only return 10 cards
          catalog: res.data.slice(0),
          //we update the buttons to catalog because we will no longer be in library
          buttons: 'catalog'
        })
        //notify the viewer that we succeeded
        toast.success('Success')
      })
  }

  //this is what is called when the viewer clicks on the next page button
  handleNextButton() {
    //first we set a new value equal to whatever is on state currently
    let newVal = this.state.page
    //then we add one to that value
    newVal++

    //then we set the state to the new value
    this.setState({
      page: newVal
    })

    //we send to the viewer that we are getting their data
    toast.warn('Getting Data')

    //next we send an axios request to get the next page
    axios.get(`http://localhost:3001/api/allCards/pages/${newVal}`)
      .then((res) => {
        this.setState({
          //here we are assigning the data to the page
          catalog: res.data.slice(0),
          //here we are showing catalog buttons again
          buttons: 'catalog'
        })
        //notify the viewer that we succeeded
        toast.success('Success')
      })
  }

  //this is what is called when the viewer clicks on the previous page button
  handlePreviousButton() {
    //first we set a new value equal to whatever is on state currently
    let newVal = this.state.page
    //then we subtract one to that value
    newVal--

    //then we set the state to the new value
    this.setState({
      page: newVal
    })

    //we send to the viewer that we are getting their data
    toast.warn('Getting Data')

    //next we send an axios request to get the next page
    axios.get(`http://localhost:3001/api/allCards/pages/${newVal}`)
      .then((res) => {
        this.setState({
          //here we are assigning the data to the page
          catalog: res.data.slice(0),
          //here we are showing catalog buttons again
          buttons: 'catalog'
        })
        //notify the viewer that we succeeded
        toast.success('Success')
      })
  }

  //this is what happens when the page loads up, it will be what is renderd on the web page
  render() {
    //before we render anything we are defining catalogCards to be whatever the state catalog cards are
    let catalogCards = this.state.catalog.map((card) => {
      //if the card has an image we display it
      if (card.image_uris) {
        //here we are returning a card and passing it in properties
        return (
          //the cards key will be equal to the cards id
          //(important for react to know the difference between each card)
          //the cards id will be equl to the cards id as well
          //(important for the axios requests)
          //the image uris is where we are getting the url to the image
          //we will send it in the cards large index (large picture) from the sizes of images (image_uris)
          //buttons tells the card that we are on catalog initially
          //handleCatAddButtonFn is just us passing this function down into card so that it can be used on
          //each card
          <Card
            key={card.id}
            id={card.id}
            imageURIS={card.image_uris['large']}
            buttons='catalog'
            handleCatAddButtonFn={this.handleCatAddButton}
          />
        )
      }
      //this is basically an else statement because we are out of the if's return statement
      //if the card doesn't have a picture return a div, it won't show up on the page
      //we still have to return something though
      //I added this because there are some cards from the api without an image
      return <div key={card.id} />
    })

    //also before we render we are defining library cards to be a mapped version of the states library cards
    let libraryCards = this.state.library.map((card) => {

      //quantity isn't currently a property on the card, so this will decide what to do with it
      //if the quantity exists, than we set the cards quanityt to what it already is (card.quanity)
      //if it doesn't exist the viewer must have added it to the library so therefore it should be at least 1
      //o and we are setting that equal to a value called quantity
      let quantity =
        card.quantity ?
          card.quantity :
          1

      //here is where we are returning a card from the library
      return (
        //see catalogCards above to know what some of these properties are
        //we did change the buttons to be library because these cards should have library buttons
        //we also gave it two functions
        //the first will handle the changing of count
        //the second will handle the clicking of a delete button
        //these two functions are defined in app.js and are just being passed downward to where the card is defined
        //quantity is how many cards there are, we added this property
        <Card
          key={card.id}
          id={card.id}
          imageURIS={card.image_uris['large']}
          buttons='library'
          handleCountChangeFn={this.handleCountChange}
          handleDelLibButtonFn={this.handleDelLibButton}
          count={quantity}
        />
        //because you can't add cards that don't have an image (solved in catalogCards) we don't have to
        //worry about returning an empty div with an id
      )
    })

    //here we set showPrevious to either be a button or nothing
    let showPrevious = this.state.page > 1

    ? 
    //if the page is greater than 1 show previous button
    //on click this button will call handle previous button
    <button className='catNavButtons previousButton' onClick={this.handlePreviousButton}>
      Previous
    </button>

    :
    //otherwise show nothing
    <div></div>

    //here is where we are actually returning stuff to the viewer
    return (
      //first we create a div called app. this will hold everything related to the website
      <div className="App">
        {/* toast is imported and will be how we notify the viewer */}
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

        {/* this is where I have imported my own header. you must pass it in a name */}
        {/* inside the header we have a simple filter. we need to pass it in a function so that we know */}
        {/* how to handle the filter deeper in the file structure */}
        <Header name='Magic catalog' handleOnChangeFn={this.handleFilter} />

        {/* here we are defining the newxt two things to be in a div */}
        {/* in the css we style them to be next to each other */}
        <div className='sameLine'>

          {/* first you have the sidebar which will be given two functions */}
          {/* I may add more later, but these two functions will be handled when clicked */}
          <Sidebar handleLibButtonFn={this.handleLibButton} handleCatButtonFn={this.handleCatButton} />

          {/* this is where the cards are going to be displayed (our main content) */}
          <main className='main'>
            {/* first we decide if the buttons are equal to catalog */}
            {/* if they are then we send catalogCards (we defined these before the render) */}
            {/* if they aren't we then send it libraryCards */}
            {/* if I add more buttons I will have to fix this logic */}
            {this.state.buttons === 'catalog' ? catalogCards : libraryCards}

            {/* Next we will see if the buttons are equal to catalog again */}
            {this.state.buttons === 'catalog'
              ?
              //if they are we send it a div with three buttons
              //each button will have it's coresponding on click function
              <div>
                {/* a next button */}
                {/* on click this button will call handle next button */}
                <button className='catNavButtons nextButton' onClick={this.handleNextButton}>
                  Next
                </button>
                {/* this will determain if we should show the previous button */}
                {showPrevious}
                {/* and a random button */}
                {/* on click this button will call handle random button */}
                <button className='catNavButtons randomButton' onClick={this.handleRandomButton}>
                  Random
                </button>
              </div>
              :
              //if the buttons are not equal to catalog give back an empty div
              //this is why just an if statement will be better later
              //FIXME - replace some turnary statements with if statements
              <div></div>
            }
          </main>
        </div>
      </div>
    );
  }
}


//we finaly export app and all of its data for use
export default App;
