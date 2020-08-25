import Constants from './CalendarConstants';
import { REHYDRATE } from 'redux-persist';

let initialState = {
    cases :[],
    selectedCase : {}
};

export default function CalendarReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case REHYDRATE:
            newState = action.payload && action.payload.calendar ?
                action.payload.calendar : newState;
            break;

        case Constants.ACTIONS.SAVE_CASE_DATA:
            newState.cases = action.caseData;
            newState.selectedCase = (action.caseData && action.caseData.length >0)? action.caseData[0] : {};
            break;
        case Constants.ACTIONS.SELECT_CASE:
            newState.selectedCase = action.selectedCase;
            break;

        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;

        default:
            break;
    }
    return newState;
}
