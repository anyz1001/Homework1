import React, { Component } from 'react';

class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.curVal
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.curVal});
    }

    handleChange(event) {
        var inputValue = event.target.value.replace(/\D/g,'');
        inputValue = inputValue == '' ? inputValue : parseInt(inputValue);
        this.setState({value: inputValue.toString()});
        this.props.inputFun('change', inputValue.toString());
    }

    onFocus(event) {
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