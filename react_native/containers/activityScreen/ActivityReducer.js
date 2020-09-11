import Constants from './ActivityConstants';
import { REHYDRATE } from 'redux-persist';

let initialState = {
    errorMessage: '',
    notificationList: []
};

export default function ActivityReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case REHYDRATE:
            newState = action.payload && action.payload.activity ?
                action.payload.activity : newState;
            break;

        case Constants.ACTIONS.SAVE_NOTIFICATION_DATA:
            newState.errorMessage = '',
            newState.notificationList = action.notificationList
            break;

        case Constants.ACTIONS.GENERAL_NOTIFICATION_ERROR:
            newState.errorMessage = action.message
            break;

        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
}
