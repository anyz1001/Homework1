import React, { Component } from 'react';

class Button extends Component {
    render() {
        return (
            <div onClick={() => this.props.clickFun(this.props.displayText)} className={this.props.class}>
                {this.props.displayText}
            </div>
        )
    }
}

module.exports = Button;