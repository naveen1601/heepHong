import Api from "../helpers/api";
import locations from "../helpers/locations";

export default {

    validateToken: function (userToken, errorCall) {

        let successCallback = () => {
            // console.log('success')
        };

        let errorCallback = (errorResponse) => {
            if (errorResponse.status === 401) {
                errorCall();
            }
        };
        if (userToken) {
            Api.doGet(locations.VALIDATE_TOKEN, {}, successCallback, errorCallback, userToken);
        }

    }
}