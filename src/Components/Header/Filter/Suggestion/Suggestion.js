//importing the things from react
import React from 'react'
//importing the style for suggestion
import './Suggestion.css'

const Suggestion = (props) => {
        let suggestions = props.suggestions.map((sug, index) => {
        return (
            <div key={index} className={'suggestionChild'}>
                {sug}
            </div>
        )
    })

    let suggestionsParent = 
    <span className={'suggestionsParent'}>
            {suggestions}
    </span>

    return (
        <div>
            {console.log(props.text)}
            {props.text !== '' ? suggestionsParent : <div></div>}
        </div>
    )
}

export default Suggestion