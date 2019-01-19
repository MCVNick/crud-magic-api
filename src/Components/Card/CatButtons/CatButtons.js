import React, {Component} from 'react'
import './CatButtons.css'

class CatButtons extends Component {
    constructor() {
        super()

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <button className='button addButton' onClick={() => this.props.handleCatAddButtonFn(this.props.id)}>
                    Add
                </button>
            </div>
        )
    }
}

export default CatButtons