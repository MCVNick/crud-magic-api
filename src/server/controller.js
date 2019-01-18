const axios = require('axios')
// const mtgDataAPI = `https://api.scryfall.com/cards`
// const mtgData = axios.get(mtgDataAPI).then((res) => res.data)
const mtgData = require('./tempScryfall.json')

let allTheMagicCards = mtgData.data

let yourMagicCards = []

module.exports = {
    getAllTheMagicCards: (req, res) => {
        res.status(200).send(allTheMagicCards)
    },
    getYourMagicCards: (req, res) => {
        res.status(200).send(yourMagicCards)
    },
    postCardToLibrary: (req, res) => {
        const cardID = req.body.id;
        const newCardIndex = allTheMagicCards.findIndex((card) => card.id === cardID)
        const yourCardIndex = yourMagicCards.findIndex((card) => card.id === cardID)

        //If that id matches something in all the cards add it is not in our cards add it
        if (newCardIndex !== -1 && yourCardIndex === -1) {
            yourMagicCards.push(allTheMagicCards[newCardIndex]);
            res.status(201).send(allTheMagicCards)
        }
        //Otherwise if it is in our cards than just update quantity
        else if (newCardIndex !== -1 && yourCardIndex !== -1) {
            yourMagicCards[yourCardIndex].quantity ?
            yourMagicCards[yourCardIndex].quantity++ :
            yourMagicCards[yourCardIndex].quantity = 2
            res.status(200).send(allTheMagicCards)
        }
        else {
            res.status(404).send(allTheMagicCards)
        }
    },
    updateCardQuantity: (req, res) => {
        const cardID = +req.params.id
        const updateQuantity = req.body.quantity
        const updateCard = yourMagicCards.findIndex((card) => card.id === cardID)

        if(updateCard === -1){
            res.status(204).send(allTheMagicCards)
        }
        else{
            if(updateQuantity <= 0){
                yourMagicCards.splice(updateCard, 1)
                res.status(200).send(allTheMagicCards)
            }
            else {
                yourMagicCards[updateCard].quantity = updateQuantity
                res.status(200).send(allTheMagicCards)
            }
        }
    },
    deleteCardFromLibrary: (req, res) => {
        const cardID = +req.params.id
        const deleteCardID = yourMagicCards.findIndex((card) => card.id === cardID)

        //If that id matches something in all the cards add it is not in our cards add it
        if (deleteCardID === -1) {
            res.status(204).send(allTheMagicCards)
        }
        //Otherwise if it is in our cards than just update quantity
        else if (yourMagicCards[deleteCardID].quantity > 1) {
            yourMagicCards[deleteCardID].quantity--
            res.status(200).send(allTheMagicCards)
        }
        else {
            yourMagicCards.splice(deleteCardID, 1)
            res.status(200).send(allTheMagicCards)
        }
    }
}