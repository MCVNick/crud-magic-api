import React, {Component} from 'react'
import './LibButtons.css'

class LibButtons extends Component {
    constructor() {
        super()

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <div className='count'>Count:</div>
                <input
                    className='inputCount'
                    type='number'
                    onChange={(e) => this.props.handleCountChangeFn(e.target.value, this.props.id)}
                    value={this.props.count}/>
                <button className='deleteCard' onClick={() => this.props.handleDelLibButtonFn(this.props.id)}>♲</button>
            </div>
        )
    }
}

export default LibButtons