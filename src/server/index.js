// this will be used to handle requests
const express = require('express')
// this will be used to handle anything we send in through the body
const bodyParser = require('body-parser')

//here we are importing the controller which will handle all the requests
const magicController = require('./controller')

//here we are saying that this is equal to express (a server helper)
const app = express()
//here we are saying that it should use bodyParser to format whatever we send in as a json
app.use(bodyParser.json())



//here are all the requests that we will handle

//Get all the magic cards from catalog (limited to 175 per call)
app.get(`/api/allCards`, magicController.getAllTheMagicCards)

//Here we are handleing getting the different page
app.get(`/api/allCards/pages/:page`, magicController.getPage)

//Get all your magic cards (not really limited, only by hardware)
app.get(`/api/yourCards`, magicController.getYourMagicCards)

//Filter your cards (unused now, but may implement later)
//here we are passing in a param with the property filter
app.get(`/api/yourCards/:filter`, magicController.filterYourLibrary)

//Filter through the catalog
//here we are passing in a param with the property filter
app.get(`/api/allCards/:filter`, magicController.filterCatalogLibrary)

//Get random cards from all the magic cards (all being all 200,000+ cards)
app.get(`/api/random`, magicController.getRandomCards)

//Posting cards into your library
app.post(`/api/allCards/`, magicController.postCardToLibrary)

//Updating cards in your library
//here we are passing in a param with the property id
app.put(`/api/allCards/:id`, magicController.updateCardQuantity)

//Deleting cards in your library
//here we are passing in a param with the property id
app.delete(`/api/allCards/:id`, magicController.deleteCardFromLibrary)

//handle getting a specific card
app.get(`/api/specific/:id`, magicController.getCard)

//handle suggestions
app.get(`/api/allCards/suggestion/:text`, magicController.getNames)

//this is the port we will be using
const port = 3001;

//then we tell it to listen on this port
app.listen(port, () => {
    //console will output that we are listening on that specified port
    console.log('Listening on port: ' + port)
})