import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: 'w3-btn w3-ripple w3-black'
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.currentFunc == this.props.displayText) {
            this.setState({className: 'w3-btn w3-ripple w3-red'});
        }
        else {
            this.setState({className: 'w3-btn w3-ripple w3-black'});
        }
    }
    
    render() {
        return (
            <div onClick={() => this.props.clickFun(this.props.displayText)} className={this.state.className}>
                {this.props.displayText}
            </div>
        )
    }
}

module.exports = Button;