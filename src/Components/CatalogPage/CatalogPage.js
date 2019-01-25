import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

import Card from '../Card/Card'

class CatalogPage extends Component {
    constructor() {
        super()

        this.state = {
            catalogCards: []
        }
    }

    componentDidMount() {
        this.handleCatCards()
    }

    handleCatCards() {
        //first we send an axios get request to the specified url
        //note that this one is all cards not your cards
        axios.get('/api/allCards')
            .then((res) => {
                //then we change the state of catalog and buttons
                this.setState({
                    //the catalog now is equal to all the cards that were returned from res.data
                    //the splice was going to be used to define how many cards I wanted to show
                    //however, I could propbably remove splice and nothing would happen
                    catalogCards: res.data.slice(0)
                })
            })
            .catch(() => {
                console.log('Missing')
            })
    }

    handleInitalEnter() {
        if(this.props.location.pathname !== '/catalog') {
            toast.info('Now In Catalog')
        }
    }

    render() {
        //before we render anything we are defining catalogCards to be whatever the state catalog cards are
        let catalogCards = this.state.catalogCards.map((card) => {
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
                    <Card
                        key={card.id}
                        id={card.id}
                        card={card}
                        imageURIS={card.image_uris['large']}
                        pathname={this.props.location.pathname}
                    />
                )
            }
            //I added this because there are some cards from the api without an image
            return null
        })


        return (
            <div className='cardParent'>
                {this.handleInitalEnter()}
                {catalogCards}
            </div>
        )
    }
}

export default CatalogPage