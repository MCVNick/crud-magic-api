//we are going to require axios to get data form a database
const axios = require('axios')
//this is the link that will have all the cards
//each request is limited to 175 cards but do have a property containing the next url
const mtgDataAPIStart = `https://api.scryfall.com/cards`
//this is the location of getting random cards from that same database
//it will only return a single card
const mtgDataAPIRandom = `https://api.scryfall.com/cards/random`
//this will handle the next/previous page of scryfalls data
const mtgDataAPIPage = `https://api.scryfall.com/cards?page=`
//this is the location of filtering through cards
const mtgDataAPISimpleFilter = `https://api.scryfall.com/cards/search?q=`


//this is the array that will hold the results of up to 175 cards
//I say up to because I automatically filter out anything that isn't english
let allTheMagicCards = []
//this is where your library is stored, and yes I know it isn't perminate
//it also isn't different per user, but that is because we haven't learned how
//to yet
let yourMagicCards = []
//this will hold the specific card if the viwer clicks on it
let specificMagicCard = []

//this function will be used later
//what it does is take promises and push urls onto them
//this will make it so that we get back a result before sending empty data
let getCard = (promises) => {
    promises.push(axios.get(mtgDataAPIRandom))
}

//this is equivilent to export default
//this will export all of these to another location
module.exports = {
    //first we are defining get all the magic cards
    getAllTheMagicCards: (req, res) => {
        //if all the magic cards are not defined
        allTheMagicCards

            //then send an axios request to get them
            ?
            axios.get(mtgDataAPIStart).then((response) => {
                //this is where we set all the magic cards array to be all the cards data we got back
                allTheMagicCards = response.data.data
                res.status(200).send(response.data.data.filter((card) => {
                    //we only return the ones with a language of english
                    return card.lang === 'en'
                }))
            })

            //else it is defined so we are going to just send the cards we already have
            :
            res.status(200).send(allTheMagicCards)
    },
    //this is how we get your magic cards
    getYourMagicCards: (req, res) => {
        //we just return the magic cards in your library
        res.status(200).send(yourMagicCards)
    },
    //this is how we post cards to your library
    postCardToLibrary: (req, res) => {
        //first we take in an id from the body
        const cardID = req.body.id;
        //then we decide if that card exists in all the magic cards
        //this will return the index of it if it does and -1 if it doesn't exist
        const newCardIndex = allTheMagicCards.findIndex((card) => card.id === cardID)
        //then we find if it is already in your library
        //if it is we return the index of it otherwise we return -1
        const yourCardIndex = yourMagicCards.findIndex((card) => card.id === cardID)

        //If that id (passed in from the body) matches something in all the cards add it is not in our cards add it
        if (newCardIndex !== -1 && yourCardIndex === -1) {
            //this is where we are adding it
            yourMagicCards.push(allTheMagicCards[newCardIndex]);
            //this is where we return all the magic cards
            res.status(201).send(yourMagicCards)
        }
        //Otherwise if it is in our cards than just update quantity
        else if (newCardIndex !== -1 && yourCardIndex !== -1) {
            //if quantity exists
            yourMagicCards[yourCardIndex].quantity ?
                //update the quantity by 1
                yourMagicCards[yourCardIndex].quantity++ :
                //otherwise set it equal to 2 because we were previously at 1 and undefined
                yourMagicCards[yourCardIndex].quantity = 2
            //then we send back your magic cards
            res.status(200).send(yourMagicCards)
        }
        else {
            //if the id doesn't exist we send a 404 and your cards back
            res.status(404).send(yourMagicCards)
        }
    },
    //this is how we handle updating the quantity
    updateCardQuantity: (req, res) => {
        //first we take in an id from the url
        const cardID = req.params.id
        //then we take in a new quantity from the put request
        const updateQuantity = req.body.quantity
        //then we see if we can find the card of that index
        //if it is found it will return the index otherwise it will be -1
        const updateCard = yourMagicCards.findIndex((card) => card.id === cardID)

        //if it equals -1 the we send back that that content is missing
        if (updateCard === -1) {
            res.status(204).send(yourMagicCards)
        }
        //otherwise it is there so we do this
        else {
            //if the quantity is less than 0 delete it
            if (updateQuantity <= 0) {
                //this is how we will delete it
                yourMagicCards.splice(updateCard, 1)
                //then send back your cards
                res.status(200).send(yourMagicCards)
            }
            //otherwise we update the quantity
            else {
                //this is how we update the quantity
                yourMagicCards[updateCard].quantity = updateQuantity
                //then we send back your cards
                res.status(200).send(yourMagicCards)
            }
        }
    },
    //this is how we delete cards from your library
    deleteCardFromLibrary: (req, res) => {
        //first we take in a card id from the paramaters
        const cardID = req.params.id
        //then we find its index. if it is -1 then the content is missing
        const deleteCardID = yourMagicCards.findIndex((card) => card.id === cardID)

        //If that id is not found
        if (deleteCardID === -1) {
            //say the content never existed
            res.status(204).send(yourMagicCards)
        }
        //otherwise the content was found
        else {
            //so we delete the card from your magic cards
            yourMagicCards.splice(deleteCardID, 1)
            //then we return your cards
            res.status(200).send(yourMagicCards)
        }
    },
    //FIXME - this is broken anyways no reason to comment it
    //I will on this filter later
    filterYourLibrary: (req, res) => {
        const filter = req.params.filter.toUpperCase()

        res.status(200).send(yourMagicCards.filter((card) => {
            return card.name.toUpperCase().includes(filter)
        }))
    },
    //this is how we filter through the catalog
    filterCatalogLibrary: (req, res) => {
        //defining filter so that we can use it in our url
        const filter = req.params.filter

        //then we send a request to the specified url
        //see the variables up to, but all we are doing is adding
        //the filtered word to mtg's filter
        axios.get(`${mtgDataAPISimpleFilter}${filter}`)
            //this is what we do next
            .then((response) => {
                //we set all the magic cards equal to what it responded with
                allTheMagicCards = response.data.data
                //we then send back all the magic cards
                res.status(200).send(allTheMagicCards)
            })
            //this is to catch if we cannot find any cards with our search
            .catch(() => {
                //first we clear the cards
                allTheMagicCards = []
                //then we send them no cards
                res.status(404).send(allTheMagicCards)
            })
    },
    //this is how we handle getting all the random cards
    getRandomCards: (req, res) => {
        //first we set all the magic cards equal to nothing
        allTheMagicCards = []
        //then we create a promises array and set it equal to nothing
        let promises = []

        //then we say we are going to return 10 urls into the promises array
        for (let i = 0; i < 10; i++) {
            //here is where we are going to get a card url onto the promises array
            getCard(promises)
        }

        //now we take all those promises
        axios.all(promises)
            .then((results) => {
                //and for each of them we will add them to our array of all magic cards
                results.forEach(response => {
                    //this is where the magic happens of combining the two pieces of data
                    //it will take in all magic cards array and then add to that array
                    //all the data from response (data are the cards)
                    allTheMagicCards = [...allTheMagicCards, { ...response.data }]
                });
                //finally we return all the magic cards
                res.status(200).send(allTheMagicCards)
            })
    },
    //this is how we will handle changing to a new page
    getPage: (req, res) => {
        //first we take in a new page from the url
        const page = req.params.page
        //next we clear the current magic cards
        allTheMagicCards = []

        //then we make an axios get request to scryfall for a specified page (the one we send in with the url)
        axios.get(`${mtgDataAPIPage}${page}`)
            .then((response) => {
                //here we set the results of that page to response.data.data (all the cards coming in)
                allTheMagicCards = response.data.data

                //now we return all 175 cards but only if they are an english card
                res.status(200).send(allTheMagicCards.filter((card) => {
                    return card.lang === 'en'
                }))
            })
            //if we recieve an error
            .catch((error) => {
                //send a 404 saying the cards wern't found
                res.status(404).send(allTheMagicCards)
            })
    },
    //this will handle getting a specific card
    getCard: (req, res) => {
        //here we are getting the id from the url
        const id = req.params.id

        axios.get(`${mtgDataAPIStart}/${id}`)
            .then((response) => {
                specificMagicCard = response.data

                res.status(200).send(specificMagicCard)
            })
    }
}