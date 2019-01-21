//here we are using stuff from react and we are going to make this a component
import React, { Component } from 'react'
//for hitting server of cards
import axios from 'axios'
//we will first get the styling from the style sheet
import './Filter.css'

//we are importing the sugestions
import Suggestion from './Suggestion/Suggestion'

//after that we create a filter class that extends component from react
class Filter extends Component {
    //this is a basic constructor with a state on it
    constructor() {
        //we inherit stuff from component
        super()

        //then we set the state of text equal to nothing
        this.state = {
            text: '',
            suggestions: [],
            focus: false
        }

        this.handleFocus = this.handleFocus.bind(this)
        this.handleOutFocus = this.handleOutFocus.bind(this)
        this.handleSugClick = this.handleSugClick.bind(this)
    }

    //this is how we will handle the change in the textbox
    //first we take in what is currently in the textbox
    handleOnChange(value) {
        if (value) {
            axios.get(`http://localhost:3001/api/allCards/suggestion/${value}`)
                .then((res) => {
                    this.setState({
                        suggestions: res.data
                    })
                })
                .catch((error) => {
                    this.setState({
                        suggestions: []
                    })
                })
            //then we set the state of the textbox
            this.setState({
                //to be equal to the value of the text box we just passed in
                //basically we jsut update the info in text box
                text: value
            })
        }
    }

    //this will handle on key press
    handleEnterKey(e) {
        //if the key we enter is the enter key
        if (e.key === 'Enter') {
            //then we should run the same thing that handle on click will run
            this.props.handleOnChangeFn(this.state.text)
        }
    }

    //this is the function that will toggle if we should show suggestions
    //if we enter focus show the suggestions
    handleFocus() {
        this.setState({
            focus: true
        })
    }

    //this is the function that will toggle if we shoudl show suggestions
    //if we leave focus don't show anything
    handleOutFocus() {
        //first we create a funciton that we want to only resolve after a certain time passes
        //this is to prevent the search from disapearing right away and not doing anything
        const delay = () => {
            return new Promise((res) => {
                setTimeout(() => {
                    this.setState({
                        focus: false
                    });
                  }, 150);
            })
        }

        //here we are creating an async function that will wait for a response
        async function wait() {
            delay()
        }

        //finally we call it
        wait()
    }

    //here we are handling when we click on a suggested name
    handleSugClick(value) {
        //first we will update the text to the suggested name
        this.setState({
            text: value
        })
        //then we will call the same thing as if we were clicking the search button
        this.props.handleOnChangeFn(this.state.text)
    }

    //this is what will be rendered when the viewer loads the page
    render() {
        //we will return this div
        return (
            //this is the parent div that will contain an input and a button
            <div className='filterParent'>
                {/* the input will handle on change by calling the handle on change method and passing it */}
                {/* the new data from the textbox */}
                <input placeholder='Card Name' onChange={(e) => this.handleOnChange(e.target.value)} onKeyPress={(e) => this.handleEnterKey(e)} onFocus={this.handleFocus} onBlur={this.handleOutFocus} />
                {/* then we will have a button next to it that says on click that we need to use the handle on change */}
                {/* again handle on change comes from header.js which comes from app.js */}
                <button onClick={() => this.props.handleOnChangeFn(this.state.text)}>
                    Search
                </button>
                {/* here we are showing suggestions based on if focus is true or false */}
                {this.state.focus ? <Suggestion suggestions={this.state.suggestions} text={this.state.text} click={this.handleSugClick} /> : null}
            </div>
        )
    }
}

//here we are exporting filter for use elseware
export default Filter