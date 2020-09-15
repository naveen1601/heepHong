import SpinnerAction from '../spinner/SpinnerActions';
import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import Constants from './LoginConstants';
import { Screens, resetScreen } from '../../helpers/screenHelpers';

export default {
    doLogin: function (username, password, firebaseToken, showErrorFunction, navigation) {
        const userCredentials = {
            Email: username,
            Password: password
        }

        return function (dispatch) {
            dispatch({type: Constants.ACTIONS.CLEAR_DATA});
            dispatch(SpinnerAction.showSpinner());
            let loginSuccess = (response) => {
                dispatch(SpinnerAction.hideSpinner());
                dispatch({
                    type: Constants.ACTIONS.SAVE_USER_DATA,
                    userData: response
                });

                resetScreen(navigation,Screens.TAB)
            };

            let errorCallback = (errorResponse) => {
                dispatch(SpinnerAction.hideSpinner());

                // showErrorFunction(errorResponse.error);
                // dispatch({
                //     type: Constants.ACTIONS.UNAUTHORIZED_REQUEST,
                //     message: errorResponse.error.Message
                // });

            };

            Api.doPost(Locations.LOGIN, userCredentials, loginSuccess, errorCallback, "", firebaseToken);
        }

    },

    updateFirebaseToken: function (firebaseToken){
        return function (dispatch) {
            dispatch({
                type: Constants.ACTIONS.SAVE_FIREBASE_TOKEN,
                firebaseToken
            });
        }
    }

}