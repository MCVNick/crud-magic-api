import React, {Component} from 'react'
import './Filter.css'

class Filter extends Component {
    constructor() {
        super()

        this.state = {
            text: ''
        }
    }

    handleOnChange(value) {
        this.setState({
            text: value
        })
    }

    render() {
        return (
            <div className='filterParent'>
                <input placeholder='Card Name' onChange={(e) => this.handleOnChange(e.target.value)}/>
                <button onClick={() => this.props.handleOnChangeFn(this.state.text)}>
                    Search
                </button>
            </div>
        )
    }
}

export default Filter