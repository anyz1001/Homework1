import React, { Component } from 'react';
import Button from './button'
import InputBox from './inputbox'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentFunc: '',
            currentVal: '',
            sumVal: '',
            cleanFlag: false
        };
    }

    setInitState = () => {
        this.setState({
            currentFunc: '',
            currentVal: '',
            sumVal: '',
            cleanFlag: false
        })
    }

    inputFun = (func, val) => {
        switch(func) {
            case 'change':
                this.setState({
                    currentVal: val
                })
                break;
            case 'focus':
            default:
                if(this.state.cleanFlag) {
                    this.setState({
                        currentVal: '',
                        cleanFlag: false
                    })
                }
                break;
        }
    }

    clickFun = (func) => {
        switch(func) {
            case '+':
            case '-':
                if(this.state.currentVal != '' && !this.state.cleanFlag) {
                    this.calculate(func);
                }
                else {
                    this.setState({
                        currentFunc: func
                    });
                }
                break;
            case '=':
                if(this.state.currentFunc != '' && !this.state.cleanFlag) {
                    this.calculate(func);
                }
                break;
            case 'C':
                this.setInitState();
                break;
            default:
                this.setState({
                    currentVal: this.state.cleanFlag ? func : parseInt(this.state.currentVal + func),
                    cleanFlag: false,
                });
                break;
        }
    }

    calculate = (func) => {
        switch(this.state.currentFunc) {
            case '-':
                this.setState({
                    sumVal: parseInt(this.state.sumVal == '' ? 0 : this.state.sumVal) - parseInt(this.state.currentVal == '' ? 0 : this.state.currentVal),
                    currentVal: parseInt(this.state.sumVal == '' ? 0 : this.state.sumVal) - parseInt(this.state.currentVal == '' ? 0 : this.state.currentVal),
                    cleanFlag: func == '=' ? false : true,
                    currentFunc: func == '=' ? '' : func
                })
                break;
            case '+':
                this.setState({
                    sumVal: parseInt(this.state.sumVal == '' ? 0 : this.state.sumVal) + parseInt(this.state.currentVal == '' ? 0 : this.state.currentVal),
                    currentVal: parseInt(this.state.sumVal == '' ? 0 : this.state.sumVal) + parseInt(this.state.currentVal == '' ? 0 : this.state.currentVal),
                    cleanFlag: func == '=' ? false : true,
                    currentFunc: func == '=' ? '' : func
                })
                break;
            default:
                this.setState({
                    sumVal: this.state.currentVal,
                    cleanFlag: func == '=' ? false : true,
                    currentFunc: func == '=' ? '' : func
                })
                break;
        }
    }

    render() {
        return (
            <div id='cal-container'>
                <InputBox inputFun={this.inputFun} curVal={this.state.currentVal}/>
                <div>
                    <Button displayText='7' currentFunc={this.state.currentFunc} clickFun={this.clickFun}/>
                    <Button displayText='8' currentFunc={this.state.currentFunc} clickFun={this.clickFun}/>
                    <Button displayText='9' currentFunc={this.state.currentFunc} clickFun={this.clickFun}/>
                    <Button displayText='C' currentFunc={this.state.currentFunc} clickFun={this.clickFun}/>
                </div>
                <div>
                    <Button displayText='4' currentFunc={this.state.currentFunc} clickFun={this.clickFun}/>
                    <Button displayText='5' currentFunc={this.state.currentFunc} clickFun={this.clickFun}/>
                    <Button displayText='6' currentFunc={this.state.currentFunc} clickFun={this.clickFun}/>
                    <Button displayText='+' currentFunc={this.state.currentFunc} clickFun={this.clickFun}/>
                </div>
                <div>
                    <Button displayText='1' currentFunc={this.state.currentFunc} clickFun={this.clickFun}/>
                    <Button displayText='2' currentFunc={this.state.currentFunc} clickFun={this.clickFun}/>
                    <Button displayText='3' currentFunc={this.state.currentFunc} clickFun={this.clickFun}/>
                    <Button displayText='-' currentFunc={this.state.currentFunc} clickFun={this.clickFun}/>
                </div>
                <div>
                    <Button displayText='0' clickFun={this.clickFun}/>
                    <Button displayText='=' clickFun={this.clickFun}/>
                </div>
            </div>
        )
    }
}

module.exports = App;