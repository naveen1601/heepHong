import Api from "../helpers/api";
import locations from "../helpers/locations";

export default {

    validateToken: function (userData, errorCall) {

        let successCallback = () => { 
            // console.log('success')
        };

        let errorCallback = (errorResponse) => {
            if (errorResponse.status === 401) {
                errorCall();
            }
        };
        let token = userData.Token;
        !!token &&
            Api.doGet(locations.VALIDATE_TOKEN, {}, successCallback, errorCallback, token);

    }
}