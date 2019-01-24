//importing the things from react
import React from 'react'
//importing the style for suggestion
import './Suggestion.css'

//we are creating a suggestion component that takes in props
const Suggestion = (props) => {
        //here we are creating suggestions to hold the five incoming suggestions using map
        let suggestions = props.suggestions.map((sug, index) => {
        return (
            //if this is clicked we will search it
            <p key={index} className={'suggestionChild'} onClick={() => props.click(sug)}>
                {sug}
            </p>
        )
    })
    
    //this is what we will return to filter
    return (
        //we are going to span and have all the suggestions appear in the span
        <span className={'suggestionsParent'}>
            {suggestions}
        </span>
    )
}

//exporting suggestions for use elseware
export default Suggestion