import React, {Component} from 'react'

class Card extends Component {
    constructor() {
        super()

        this.state = {
            
        }
    }

    render() {
        return (
            <div className='cardParent'>
                <img src={this.props.imageURIS} alt="Magic Card"/>
            </div>
        )
    }
}

export default Card