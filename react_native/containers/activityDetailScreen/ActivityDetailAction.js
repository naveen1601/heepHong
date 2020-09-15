import { Screens, resetScreen } from '../../helpers/screenHelpers';
import locations from '../../helpers/locations';
import Api from '../../helpers/api';
import SpinnerActions from '../spinner/SpinnerActions';
import Constants from './ActivityDetailConstants';

export default {
    getNotificationDetail: function (token, notificationID, navigation) {

        return function (dispatch) {

            dispatch(SpinnerActions.showSpinner());

            let notificationDetailSuccess = (response) => {
                dispatch(SpinnerActions.hideSpinner());
                dispatch({
                    type: Constants.ACTIONS.SAVE_NOTIFICATION_DETAIL,
                    activityDetailData: response,

                });
            };

            let errorCallback = (errorResponse) => {
                dispatch(SpinnerActions.hideSpinner());
                if (errorResponse.status === 401) {
                    dispatch({
                        type: Constants.ACTIONS.CLEAR_DATA
                    });
                    resetScreen(navigation, Screens.LOGIN_SCREEN)
                }
                else {
                    dispatch({
                        type: Constants.ACTIONS.GENERAL_NOTIFICATION_DETAIL_ERROR,
                        message: errorResponse.error.message
                    });
                }

            };

            Api.doGet(locations.GETNOTIFICATION_DETAIL, { "Id": notificationID }, notificationDetailSuccess, errorCallback, token);
        }
    },
    updateFirebaseNotificationId: function (firebaseNotificationId) {
        return function (dispatch) {
            dispatch({
                type:Constants.ACTIONS.UPDATE_FIREBASE_NOTIFICATION_ID,
                firebaseNotificationId
            })
        }
    }
}