//importing things from react
import React from 'react'
//importing the cards styling
import './Card.css'

//importing the bottons that will apear on the cards
import CatButtons from './CatButtons/CatButtons'
import LibButtons from './LibButtons/LibButtons'
import SingleCardButtons from './SingleCardButtons/SingleCardButtons'

//defining what a card is and it takes in props
const Card = (props) => {
    let singleCardView =
        <div className='singleCardParent'>
            {/* this is where we display the image */}
            {/* src will contain the url passed in from props */}
            <img className='card' src={props.imageURIS} alt="Magic Card" onClick={() => props.handleCardClickFn(props.id)} />
            {
                // if the buttons are equal to catalog
                props.buttons === 'singleCard'
                    ?
                    <div>
                        {/* //show the single card view */}
                        {/* //we will pass into this one the handle add catalog button function from app.js to the catalog buttons */}
                        {/* //we will also pass in the id */}
                        <SingleCardButtons
                            handleCatAddButtonFn={props.handleCatAddButtonFn}
                            id={props.id}
                        />
                        {console.log(props.card)}
                        <p className={'singleCardName'}>{props.card.name}</p>
                        <p className={'singleCardText'}>{props.card.oracle_text}</p>

                    </div>

                    :
                    null
            }
        </div>



    let notSingleCardView =
        //we are going to return this div which will hold an image and some buttons
        <div className='cardParent'>
            {/* this is where we display the image */}
            {/* src will contain the url passed in from props */}
            <img className='card' src={props.imageURIS} alt="Magic Card" onClick={() => props.handleCardClickFn(props.id)} />
            {
                // if the buttons are equal to catalog
                props.buttons === 'catalog'
                    ?
                    //show the catalog buttons
                    //we will pass into this one the handle add catalog button function from app.js to the catalog buttons
                    //we will also pass in the id
                    <CatButtons
                        handleCatAddButtonFn={props.handleCatAddButtonFn}
                        id={props.id}
                    />
                    :
                    null
            }
            {
                props.buttons === 'library'
                    ?
                    //otherwise show the library buttons
                    //this is why I may need to come back and fix this turnary if I add more buttons
                    //we will pass in the way to handle the change of quanity from app.js to these buttons
                    //we will pass in the current count to these buttons (I guess and input)
                    //we will also pass in the unique id
                    //we will lastly pass in the function to deleting a card from your library from app.js
                    <LibButtons
                        handleCountChangeFn={props.handleCountChangeFn}
                        count={props.count}
                        id={props.id}
                        handleDelLibButtonFn={props.handleDelLibButtonFn}
                    />
                    :
                    null
            }
        </div>
    //this saying we are going to return something to react render
    return (
        props.buttons === 'singleCard' ? singleCardView : notSingleCardView
    )
}

//here we are exporting card to be used elseware
export default Card