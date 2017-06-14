import React, { Component } from 'react';
import Button from './button'
import InputBox from './inputbox'
import Logs from './logs'

const btnArray = ['7','8','9','C','4','5','6','+','1','2','3','-','0','='];
const rowSize = 4;

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentFunc: '',
            currentVal: '',
            sumVal: '',
            cleanFlag: false,
            history: []
        };
    }

    setInitState = () => {
        this.setState({
            currentFunc: '',
            currentVal: '',
            sumVal: '',
            cleanFlag: false,
            history: []
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
                        cleanFlag: false,
                        currentFunc: this.state.currentFunc == '=' ? '' : this.state.currentFunc,
                        history: this.state.currentFunc == '=' ? [] : this.state.history
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
                    this.doMath(func);
                }
                else {
                    this.setState({
                        currentFunc: func
                    });
                }
                break;
            case '=':
                if(this.state.currentFunc != '' && !this.state.cleanFlag) {
                    if (this.state.currentVal == '')
                        this.setState({
                            currentVal: this.state.sumVal,
                            cleanFlag: true,
                            currentFunc: func
                        })
                    else
                        this.doMath(func);
                }
                break;
            case 'C':
                this.setInitState();
                break;
            default:
                this.setState({
                    currentVal: this.state.cleanFlag ? func : parseInt(this.state.currentVal + func),
                    cleanFlag: false,
                    currentFunc: this.state.currentFunc == '=' ? '' : this.state.currentFunc,
                    history: this.state.currentFunc == '=' ? [] : this.state.history
                });
                break;
        }
    }

    doMath = (func) => {
        switch(this.state.currentFunc) {
            case '-':
            case '+':
                let logs = this.state.history.slice();
                let preVal = parseInt(this.state.sumVal == '' ? 0 : this.state.sumVal);
                let curVal = parseInt(this.state.currentVal)
                let total = this.calculate(preVal, curVal, this.state.currentFunc);
                logs.push({
                        curVal: curVal,
                        func: this.state.currentFunc
                    })
                this.setState({
                    sumVal: total,
                    currentVal: total,
                    cleanFlag: true,
                    currentFunc: func,
                    history: logs
                })
                break;
            default:
                this.setState({
                    sumVal: this.state.currentVal,
                    cleanFlag: true,
                    currentFunc: func
                })
                break;
        }
    }

    calculate = (preVal, curVal, func) => {
        switch(func) {
            case '-':
                return preVal - curVal;
            case '+':
                return preVal + curVal;
            default:
                break;
        }
    }

    delLog = (index) => {
        let logs = this.state.history.slice();
        let sumVal = parseInt(this.state.sumVal);
        let curVal = parseInt(logs[index].curVal);
        let func = logs[index].func == '+' ? '-' : '+'
        let total = this.calculate(sumVal, curVal, func);
        logs.splice(index, 1);
        if(this.state.currentFunc == '='){
            this.setState({
                sumVal: total,
                currentVal: total,
                history: logs
            })
        }
        else
            this.setState({
                sumVal: total,
                history: logs
            })
    }

    render() {
        const {
            currentFunc,
            currentVal,
            history
        } = this.state;
        let rowArray = [];
        const btnElement = btnArray.map((data, index) => {
            return <Button key={index} displayText={data} currentFunc={currentFunc} clickFun={this.clickFun}
                    class={currentFunc == data ? 'w3-btn w3-ripple w3-red' : 'w3-btn w3-ripple w3-black'}/>
        }).reduce(function(previousValue, currentValue, currentIndex){
            currentIndex % rowSize == 0 && rowArray.push([]);
            rowArray[rowArray.length - 1].push(currentValue);
            return rowArray;
        }, rowArray).map((data, index) => {
            return <div key={'rows_' + index}>{data}</div>
        })

        const divLogs = history.map((data, index) => {
            return <Logs key={index} index={index} curVal={data.curVal} func={data.func} clickFun={this.delLog}/>
        })

        return (
            <div>
                <div id='cal-container'>
                    <InputBox inputFun={this.inputFun} curVal={currentVal}/>
                    {btnElement}
                </div>
                <div id="cal-history">
                    {divLogs}
                </div>
            </div>
        )
    }
}

module.exports = App;