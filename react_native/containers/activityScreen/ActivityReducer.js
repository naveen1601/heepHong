import Constants from './ActivityConstants';
import { REHYDRATE } from 'redux-persist';
import moment from 'moment'

let initialState = {
    errorMessage: '',
    notificationList: [],
    totalPages: 1,
    nextPageCounter: 1
};

export default function ActivityReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case REHYDRATE:
            newState = action.payload && action.payload.activity ?
                action.payload.activity : newState;
            break;

        case Constants.ACTIONS.SAVE_NOTIFICATION_DATA:

            action.activityData.NotificationList.forEach(item => {
                item.groupDate = moment(item.Created_Date).format('MM-DD-YYYY')
            })
            newState.errorMessage = '';
            newState.notificationList = [...state.notificationList, ...action.activityData.NotificationList];
            newState.totalPages = action.activityData.TotalPages;
            newState.nextPageCounter = state.nextPageCounter + 1;
            break;

        case Constants.ACTIONS.GENERAL_NOTIFICATION_ERROR:
            newState.errorMessage = action.message
            break;

        case Constants.ACTIONS.CLEAR_ACTIVITY:
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
}
