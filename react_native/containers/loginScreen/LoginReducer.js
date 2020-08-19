import Constants from './LoginConstants';
import { REHYDRATE } from 'redux-persist';

let initialState = {
    language: 'en',
    isLoggedIn: false,
    isLoginModalSpinnerVisible: false,
    userData: []
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
        default:
            break;
    }
    return newState;
}
