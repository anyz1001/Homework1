import React, { Component } from 'react';
import Button from './button';
import InputBox from './inputbox';
import Logs from './logs';
import { connect } from 'react-redux';
import action from './action';

const btnArray = ['7','8','9','C','4','5','6','+','1','2','3','-','0','='];
const rowSize = 4;
const switchBtnClickFun = (function(btn, actions){
    switch(btn){
        case '=':
            return actions.sum_addHistory;
        case 'C':
            return actions.reset_state;
        case '+':
        case '-':
            return actions.update_operator;
        default:
            return actions.update_inputValue;
    }
});
const App = ({
    state: {
        currentOperator,
        currentValue,
        history
    },
    update_inputValue,
    key_inputValue,
    update_operator,
    reset_state,
    sum_addHistory,
    remove_History
}) => {
    let rowArray = [];
    const actions = {
        update_inputValue, update_operator, reset_state, sum_addHistory
    };
    const btnElement = btnArray.map((data, index) => {
        return <Button key={index} displayText={data} clickFun={switchBtnClickFun(data, actions)}
                class={currentOperator == data ? 'w3-btn w3-ripple w3-red' : 'w3-btn w3-ripple w3-black'}/>
    }).reduce(function(previousValue, currentValue, currentIndex){
        currentIndex % rowSize == 0 && rowArray.push([]);
        rowArray[rowArray.length - 1].push(currentValue);
        return rowArray;
    }, rowArray).map((data, index) => {
        return <div key={'rows_' + index}>{data}</div>
    })
    
    const divLogs = history.map((data, index) => {
        return <Logs key={index} index={index} curVal={data.currentValue} func={data.operator} clickFun={remove_History}/>
    })

    return (
        <div>
            <div id='cal-container'>
                <InputBox inputFun={key_inputValue} curVal={currentValue}/>
                {btnElement}
            </div>
            <div id="cal-history">
                {divLogs}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { state };
}
const mapDispatchToProps = (dispatch) => ({
    update_inputValue: (value) => dispatch(action.update_inputValue(value)),
    key_inputValue: (move, value) => dispatch(action.key_inputValue(move, value)),
    update_operator: (operator) => dispatch(action.update_operator(operator)),
    reset_state: () => dispatch(action.reset_state()),
    sum_addHistory: (operator) => dispatch(action.sum_addHistory(operator)),
    remove_History: (id) => dispatch(action.remove_History(id))
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);