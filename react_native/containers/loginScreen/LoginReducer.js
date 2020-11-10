import Constants from './LoginConstants';
import { REHYDRATE } from 'redux-persist';
import CryptoJS from "react-native-crypto-js";

let initialState = {
    language: 'zh',
    isLoggedIn: false,
    userData: {},
    errorMessage: '',
    firebaseToken: '',
    validateToken: ''
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
            newState.validateToken = action.userData?.Token && CryptoJS.AES.encrypt(action.userData.Token, 'HH$EncM@Ap0K20_@!').toString();
            newState.isLoggedIn = true;
            newState.errorMessage = '';
            break;

        case Constants.ACTIONS.SAVE_FIREBASE_TOKEN:
            newState.firebaseToken= action.firebaseToken;
            break;
        case Constants.ACTIONS.UNAUTHORIZED_REQUEST:
            newState.userData = {};
            newState.isLoggedIn = false;
            newState.errorMessage = action.message;
            newState.validateToken = '';
            break;

        case Constants.ACTIONS.CLEAR_DATA:
            newState.userData = {};
            newState.isLoggedIn = false;
            newState.errorMessage = '';
            newState.validateToken = '';
            break;

        default:
            break;
    }
    return newState;
}
