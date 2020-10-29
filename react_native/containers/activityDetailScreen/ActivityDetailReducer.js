import Constants from './ActivityDetailConstants';
import { REHYDRATE } from 'redux-persist';

let initialState = {
    errorMessage: '',
    notificationDetail: '',
    firebaseNotificationId: ''
};

export default function ActivityReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case REHYDRATE:
            newState = action.payload && action.payload.activityDetail ?
                action.payload.activityDetail : newState;
            break;

        case Constants.ACTIONS.SAVE_NOTIFICATION_DETAIL:
            newState.errorMessage = '';
            newState.notificationDetail = action.activityDetailData;
            newState.firebaseNotificationId = ''
            break;

        case Constants.ACTIONS.GENERAL_NOTIFICATION_DETAIL_ERROR:
            newState.errorMessage = action.message;
            ewState.notificationDetail= ''
            break;
        case Constants.ACTIONS.UPDATE_FIREBASE_NOTIFICATION_ID:
            newState.firebaseNotificationId = action.firebaseNotificationId
            break;
        case Constants.ACTIONS.REMOVE_FIREBASE_NOTIFICATION_ID:
            newState.firebaseNotificationId = ''
            break;
        case Constants.ACTIONS.CLEAR_NOTIFICATION_DETAIL:
            newState.notificationDetail = initialState.notificationDetail;
            newState.errorMessage = initialState.errorMessage;
            break;
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
}
