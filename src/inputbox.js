import React, { Component } from 'react';

class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.curVal
        };
    }
    
    componentWillReceiveProps = (nextProps) => {
        this.setState({value: nextProps.curVal});
    }

    handleChange = (event) => {
        var inputValue = event.target.value.replace(/\D/g,'');
        this.props.inputFun('change', inputValue);
    }

    onFocus = (event) => {
        this.props.inputFun('focus', '');
    }

    render() {
        return (
            <div id='inputBox'>
                <input type='text' value={this.state.value} onChange={this.handleChange} onFocus={this.onFocus}/>
            </div>
        )
    }
}

module.exports = InputBox;