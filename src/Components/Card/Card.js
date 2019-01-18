import React, {Component} from 'react'
import './Card.css'

import CatButtons from './CatButtons/CatButtons'
import LibButtons from './LibButtons/LibButtons'

class Card extends Component {
    constructor() {
        super()

        this.state = {
            
        }
    }

    render() {
        return (
            <div className='cardParent'>
                <img className='card' src={this.props.imageURIS} alt="Magic Card" button={this.props.button}/>
                {
                    this.props.buttons === 'catalog' ?
                                            <CatButtons
                                                handleCatAddButtonFn={this.props.handleCatAddButtonFn}
                                                id={this.props.id}
                                            /> :
                                            <LibButtons
                                                handleCountChangeFn={this.props.handleCountChangeFn}
                                                count={this.props.count}
                                                id={this.props.id}
                                                handleDelLibButtonFn={this.props.handleDelLibButtonFn}
                                            />
                }
            </div>
        )
    }
}

export default Card