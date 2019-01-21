//here we are using stuff from react and we are going to make this a component
import React, {Component} from 'react'
//for hitting server of cards
import axios from 'axios'
//we will first get the styling from the style sheet
import './Filter.css'

//after that we create a filter class that extends component from react
class Filter extends Component {
    //this is a basic constructor with a state on it
    constructor() {
        //we inherit stuff from component
        super()

        //then we set the state of text equal to nothing
        this.state = {
            text: '',
            suggestions: []
        }
    }

    //this is how we will handle the change in the textbox
    //first we take in what is currently in the textbox
    handleOnChange(value) {
        axios.get(`http://localhost:3001/api/allCards/suggestion/${value}`)
            .then((res) => {
                console.log(res.data)
                this.setState({
                    suggestions: res.data
                })
            })
        //then we set the state of the textbox
        this.setState({
            //to be equal to the value of the text box we just passed in
            //basically we jsut update the info in text box
            text: value
        })
    }

    //this will handle on key press
    handleEnterKey(e) {
        //if the key we enter is the enter key
        if (e.key === 'Enter') {
            //then we should run the same thing that handle on click will run
            this.props.handleOnChangeFn(this.state.text)
        }
    }

    //this is what will be rendered when the viewer loads the page
    render() {
        //we will return this div
        return (
            //this is the parent div that will contain an input and a button
            <div className='filterParent'>
                {/* the input will handle on change by calling the handle on change method and passing it */}
                {/* the new data from the textbox */}
                <input placeholder='Card Name' onChange={(e) => this.handleOnChange(e.target.value)} onKeyPress={(e) => this.handleEnterKey(e)}/>
                {/* then we will have a button next to it that says on click that we need to use the handle on change */}
                {/* again handle on change comes from header.js which comes from app.js */}
                <button onClick={() => this.props.handleOnChangeFn(this.state.text)}>
                    Search
                </button>
            </div>
        )
    }
}

export default Filter