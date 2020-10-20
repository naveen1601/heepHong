import { Screens, resetScreen } from '../../helpers/screenHelpers';
import locations from '../../helpers/locations';
import Api from '../../helpers/api';
import SpinnerActions from '../spinner/SpinnerActions';
import Constants from '../calendarScreen/CalendarConstants';

export default {

    previousAppointment: function (token, caseId, appointmentId, checkPrevAndNextButton) {
        const bodyParam = {
            AppointmentId: appointmentId,
            CaseId: caseId,
            isNext: false
        }

        return function (dispatch) {

            dispatch(SpinnerActions.showSpinner());

            let loginSuccess = (response) => {
                dispatch(SpinnerActions.hideSpinner());
                if (response) {
                    checkPrevAndNextButton(response.HasPrev, response.HasNext);
                    dispatch({
                        type: Constants.ACTIONS.SAVE_APPOINTMENT,
                        selectedAppointment: response
                    });
                }
            };

            let errorCallback = (errorResponse) => {
                dispatch(SpinnerAction.hideSpinner());
                if (errorResponse.status === 401) {
                    dispatch({
                        type: Constants.ACTIONS.CLEAR_DATA
                    });
                    resetScreen(navigation,Screens.LOGIN_SCREEN)
                }
                // else {
                //     dispatch({
                //         type: Constants.ACTIONS.GENERAL_LOGIN_ERROR,
                //         message: errorResponse.error.message
                //     });
                // }

            };

            Api.doGet(locations.NEXTAPPOINTMENT, bodyParam, loginSuccess, errorCallback, token);
        }
    },
    nextAppointment: function (token, caseId, appointmentId, checkPrevAndNextButton) {
        const bodyParam = {
            AppointmentId: appointmentId,
            CaseId: caseId,
            isNext: true
        }

        return function (dispatch) {

            dispatch(SpinnerActions.showSpinner());

            let loginSuccess = (response) => {
                dispatch(SpinnerActions.hideSpinner());
                if (response) {
                    checkPrevAndNextButton(response.HasPrev, response.HasNext);
                    dispatch({
                        type: Constants.ACTIONS.SAVE_APPOINTMENT,
                        selectedAppointment: response
                    });
                }
                //navigation.navigate(Screens.DETAIL_SCREEN)
            };

            let errorCallback = (errorResponse) => {
                dispatch(SpinnerActions.hideSpinner());
                if (errorResponse.status === 401) {
                    dispatch({
                        type: Constants.ACTIONS.CLEAR_DATA
                    });
                    resetScreen(navigation,Screens.LOGIN_SCREEN)
                }
                // else {
                //     dispatch({
                //         type: Constants.ACTIONS.GENERAL_ERROR,
                //         message: errorResponse.error.message
                //     });
                // }

            };

            Api.doGet(locations.NEXTAPPOINTMENT, bodyParam, loginSuccess, errorCallback, token);
        }
    }

}