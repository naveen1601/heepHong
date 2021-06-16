import Api from '../../helpers/api';
import { Screens, resetScreen } from '../../helpers/screenHelpers';
import Locations from '../../helpers/locations';
export default {
    doLogout: function (navigation, token) {
        const callBack = () => { }
        return function (dispatch) {
            dispatch({ type: 'CLEAR_DATA' });
            resetScreen(navigation, Screens.LOGIN_SCREEN)
            token &&
                Api.doPost(Locations.LOGOUT, {}, callBack, callBack, token);
        }
    }

}