import Api from "../helpers/api";
import locations from "../helpers/locations";

export default {

    validateToken: function (userToken, errorCall, successCallback = () =>{}) {

        if (userToken) {
            Api.doGet(locations.VALIDATE_TOKEN, {}, successCallback, errorCall, userToken);
        }

    }
}