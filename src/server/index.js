const express = require('express')
const bodyParser = require('body-parser')

const magicController = require('./controller')

const app = express()
app.use(bodyParser.json())

app.get(`/api/allCards`, magicController.getAllTheMagicCards)
app.get(`/api/yourCards`, magicController.getYourMagicCards)
app.post(`/api/allCards/`, magicController.postCardToLibrary)
app.put(`/api/allCards/:id`, magicController.updateCardQuantity)
app.delete(`/api/allCards/:id`, magicController.deleteCardFromLibrary)

const port = 3001;
app.listen(port, () => {
    console.log('Listening on port: ' + port)
})