const axios = require('axios')
const mtgDataAPIStart = `https://api.scryfall.com/cards`
const mtgDataAPIRandom = `https://api.scryfall.com/cards/random`
let mtgDataAPINext = ''


let allTheMagicCards = []
let yourMagicCards = []

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    getAllTheMagicCards: (req, res) => {
        allTheMagicCards 

        ?
        axios.get(mtgDataAPIStart).then((response) => {
            allTheMagicCards = response.data.data
            res.status(200).send(response.data.data.filter((card) => {
                return card.lang === 'en'
            }))
        })

        :
        res.status(200).send(response.data.data)
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
            res.status(201).send(yourMagicCards)
        }
        //Otherwise if it is in our cards than just update quantity
        else if (newCardIndex !== -1 && yourCardIndex !== -1) {
            yourMagicCards[yourCardIndex].quantity ?
            yourMagicCards[yourCardIndex].quantity++ :
            yourMagicCards[yourCardIndex].quantity = 2
            res.status(200).send(yourMagicCards)
        }
        else {
            res.status(404).send(yourMagicCards)
        }
    },
    updateCardQuantity: (req, res) => {
        const cardID = req.params.id
        const updateQuantity = req.body.quantity
        const updateCard = yourMagicCards.findIndex((card) => card.id === cardID)

        if(updateCard === -1){
            res.status(204).send(yourMagicCards)
        }
        else{
            if(updateQuantity <= 0){
                yourMagicCards.splice(updateCard, 1)
                res.status(200).send(yourMagicCards)
            }
            else {
                yourMagicCards[updateCard].quantity = updateQuantity
                res.status(200).send(yourMagicCards)
            }
        }
    },
    deleteCardFromLibrary: (req, res) => {
        const cardID = req.params.id
        const deleteCardID = yourMagicCards.findIndex((card) => card.id === cardID)

        //If that id matches something in all the cards add it is not in our cards add it
        if (deleteCardID === -1) {
            res.status(204).send(yourMagicCards)
        }
        else {
            yourMagicCards.splice(deleteCardID, 1)
            res.status(200).send(yourMagicCards)
        }
    },
    filterYourLibrary: (req, res) => {
        const filter = req.params.filter.toUpperCase()

        res.status(200).send(yourMagicCards.filter((card) => {
            return card.name.toUpperCase().includes(filter)
        }))
    },
    filterCatalogLibrary: (req, res) => {
        const filter = req.params.filter.toUpperCase()

        axios.get(`https://api.scryfall.com/cards/search?q=${filter}`)
        .then((response) => {
            allTheMagicCards = response.data.data
            res.status(200).send(allTheMagicCards)
        })
    }
}