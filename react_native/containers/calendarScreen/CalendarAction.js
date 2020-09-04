import { Screens, resetScreen } from '../../helpers/screenHelpers';
import locations from '../../helpers/locations';
import Api from '../../helpers/api';
import SpinnerActions from '../spinner/SpinnerActions';
import Constants from './CalendarConstants';

export default {
    getCases: function (token, navigation) {

        return function (dispatch) {

            dispatch(SpinnerActions.showSpinner());
            let loginSuccess = (response) => {
                dispatch(SpinnerActions.hideSpinner());
                dispatch({
                    type: Constants.ACTIONS.SAVE_CASE_DATA,
                    caseData: response
                });
            };

            let errorCallback = (errorResponse) => {
                dispatch(SpinnerAction.hideSpinner());
                if (errorResponse.status === 401) {
                    dispatch({
                        type: Constants.ACTIONS.CLEAR_DATA
                    });
                    resetScreen(navigation,Screens.LOGIN_SCREEN)
                }
                else {
                    dispatch({
                        type: Constants.ACTIONS.GENERAL_LOGIN_ERROR,
                        message: errorResponse.error.message
                    });
                }

            };

            Api.doGet(locations.CASES, '', loginSuccess, errorCallback, token);
        }

    },
    saveSelectedCase: function (selectedCase){
        return function (dispatch) {
            dispatch({
                type: Constants.ACTIONS.SELECT_CASE,
                selectedCase: selectedCase
            });
        }
    },

    getAppointmentDetails: function(appointmentId, selectedCase, token, navigation){

        return function (dispatch) {

            dispatch(SpinnerActions.showSpinner());
            let loginSuccess = (response) => {
                dispatch(SpinnerActions.hideSpinner());
                dispatch({
                    type: Constants.ACTIONS.SAVE_APPOINTMENT,
                    selectedAppointment: response
                });
                navigation.navigate(Screens.DETAIL_SCREEN)
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
                        type: Constants.ACTIONS.GENERAL_ERROR,
                        message: errorResponse.error.message
                    });
                }

            };

            Api.doGet(locations.APPOINTMENT, {AppointmentId: appointmentId, CaseId: selectedCase}, loginSuccess, errorCallback, token);
        }

    }

}