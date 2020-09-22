import { Screens, resetScreen } from '../../helpers/screenHelpers';
import locations from '../../helpers/locations';
import Api from '../../helpers/api';
import SpinnerActions from '../spinner/SpinnerActions';
import Constants from './ActivityConstants';

export default {
    getNotifications: function (token, pageNo, navigation) {

        return function (dispatch) {

            dispatch(SpinnerActions.showSpinner());

            let notificationSuccess = (response) => {
                dispatch(SpinnerActions.hideSpinner());
                dispatch({
                    type: Constants.ACTIONS.SAVE_NOTIFICATION_DATA,
                    activityData: response,

                });
            };

            let errorCallback = (errorResponse) => {
                dispatch(SpinnerActions.hideSpinner());
                if (errorResponse.status === 401) {
                    dispatch({
                        type: Constants.ACTIONS.CLEAR_DATA
                    });
                    resetScreen(navigation,Screens.LOGIN_SCREEN)
                }
                else {
                    dispatch({
                        type: Constants.ACTIONS.GENERAL_NOTIFICATION_ERROR,
                        message: errorResponse.error.Message
                    });
                }

            };

            Api.doGet(locations.GETNOTIFICATION, {"PageNo": pageNo, "PageSize":6}, notificationSuccess, errorCallback, token);
        }
    },
}