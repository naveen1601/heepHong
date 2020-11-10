import Api from "../helpers/api";
import locations from "../helpers/locations";
import CryptoJS from "react-native-crypto-js";

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
        // let token = userToken;
        // let bytes  = CryptoJS.AES.decrypt(encryptEmail, 'hhsencryptionkey0');
        // const token = bytes.toString(CryptoJS.enc.Utf8);
        if (userToken) {
            // let token = userToken;
            let bytes = CryptoJS.AES.decrypt(userToken, 'HH$EncM@Ap0K20_@!');
            const token = bytes.toString(CryptoJS.enc.Utf8);
            Api.doGet(locations.VALIDATE_TOKEN, {}, successCallback, errorCallback, token);
        }

    }
}