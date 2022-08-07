import React from "react";

class  ClassCounter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    Increment = () => {
        this.setState({count: this.state.count + 1})
    }

    Decrement = () => {
        this.setState({count: this.state.count - 1})
    }

    render() {
        return (
            <div>
                <h2>{this.state.count}</h2>
                <button onClick={this.Increment}>Increment</button>
                <button onClick={this.Decrement}>Decrement</button>
            </div>
        )
    }
}

export default ClassCounter;