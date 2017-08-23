import { UPDATE_INPUTVALUE, KEY_INPUTVALUE, UPDATE_OPERATOR, RESET_STATE, SUM_ADDHISTORY, REMOVE_HISTORY } from './actionType';

const initState = { 
    currentOperator: '', 
    currentValue: '', 
    sumValue: 0, 
    history: [], 
    cleanFlag: false 
};

const Reducer = (state = initState, action) => {
    let newState = {...state};
    switch (action.type) {
        case UPDATE_INPUTVALUE:
            if(newState.cleanFlag) {
                newState.cleanFlag = false;
                newState.currentValue = '';
                if(newState.currentOperator === '') {
                    newState.history = [];
                }
            }
            newState.currentValue += action.value;
            if(newState.currentOperator === '')
                newState.sumValue = parseInt(newState.currentValue);
            return newState;
        case KEY_INPUTVALUE:
            switch(action.move) {
            case 'change':
                newState.currentValue = action.value;
                if(newState.currentOperator === '')
                    newState.sumValue = parseInt(newState.currentValue);
                return newState;
            case 'focus':
                if(newState.cleanFlag) {
                    newState.cleanFlag = false;
                    newState.currentValue = '';
                    if(newState.currentOperator === '') {
                        newState.history = [];
                    }
                }
                return newState;
            }
        case UPDATE_OPERATOR:
            if(!newState.cleanFlag && newState.currentOperator !== '') {
                newState = add_history(state);
                newState.sumValue = newState.currentValue = sum(state.sumValue, state.currentValue, state.currentOperator);
            }
            newState.cleanFlag = true;
            newState.currentOperator = action.operator;
            return newState;
        case RESET_STATE:
            return initState;
        case SUM_ADDHISTORY:
            if(state.currentValue !== '' && state.currentOperator !== '') {
                newState = add_history(state);
                const newSum = sum(state.sumValue, state.currentValue, state.currentOperator);
                return {
                    ...newState,
                    sumValue: newSum,
                    currentOperator: '',
                    currentValue: newSum,
                    cleanFlag: true
                };
            }
            break;
        case REMOVE_HISTORY:
            var opr = newState.history[action.id].operator;
            switch (opr) {
                case '+':
                    newState.sumValue = sum(newState.sumValue, newState.history[action.id].currentValue, '-');
                    break;
                case '-':
                    newState.sumValue = sum(newState.sumValue, newState.history[action.id].currentValue, '+');
                    break;
            }
            newState.history.splice(action.id, 1);    
            if(newState.cleanFlag) {
                newState.currentValue = newState.sumValue;
            }
            return newState;
        default:
            return state;
    }}

function sum (sumValue, currentValue, operator) {
    console.log(sumValue + '|' + currentValue);
    switch (operator) {
        case '+':
            return sumValue + parseInt(currentValue);
        default:
            return sumValue - parseInt(currentValue);
    }
}

function add_history (currentState){
    
    const currentHistory = [...currentState.history];
    currentHistory.push({
        currentValue: currentState.currentValue,
        operator: currentState.currentOperator
    });
    return {
        ...currentState,
        history: currentHistory
    };
}

module.exports = Reducer;