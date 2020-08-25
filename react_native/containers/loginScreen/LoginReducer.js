import Constants from './LoginConstants';
import { REHYDRATE } from 'redux-persist';

let initialState = {
    language: 'en',
    isLoggedIn: false,
    userData: {},
    errorMessage: ''
};

export default function LoginReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case REHYDRATE:
            newState = action.payload && action.payload.login ?
                action.payload.login : newState;
            break;

        case Constants.ACTIONS.SAVE_LANGUAGE:
            newState.language = action.language;
            break;

        case Constants.ACTIONS.SAVE_USER_DATA:
            newState.userData = action.userData;
            newState.isLoggedIn = true;
            newState.errorMessage = '';
            break;

        case Constants.ACTIONS.UNAUTHORIZED_REQUEST:
            newState.userData = {};
            newState.isLoggedIn = false;
            newState.errorMessage = action.message;
            break;

        case Constants.ACTIONS.CLEAR_DATA:
            newState.userData = {};
            newState.isLoggedIn = false;
            newState.errorMessage = '';
            break;

        default:
            break;
    }
    return newState;
}
