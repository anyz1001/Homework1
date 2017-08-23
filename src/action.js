import { UPDATE_INPUTVALUE, KEY_INPUTVALUE, UPDATE_OPERATOR, RESET_STATE, SUM_ADDHISTORY, REMOVE_HISTORY } from './actionType';

const action = {
    update_inputValue: (value) => ({ type: UPDATE_INPUTVALUE, value }),
    key_inputValue: (move, value) => ({ type: KEY_INPUTVALUE, move, value }),
    update_operator: (operator) => ({ type: UPDATE_OPERATOR, operator }),
    reset_state: () => ({ type: RESET_STATE }),
    sum_addHistory: (operator) => ({ type: SUM_ADDHISTORY, operator }),
    remove_History: (id) => ({ type: REMOVE_HISTORY, id })
}

module.exports = action;