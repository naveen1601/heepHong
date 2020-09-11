import axios from "axios";
import links from './links';
import ObjectHelper from "./objectHelpers";
import I18n from '../i18n/locales';


function getLocation(location) {
    return links.baseApi + location;
}

function status(response) {
    if (response.status === 204) {
        return Promise.resolve(null);
    }
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response.data);
    } else {
        return Promise.reject({ statusText: response.statusText, status: response.status, responseJson: response.data });
    }
}

function errorCall(res, errorCallback) {
    if (res.response != undefined) {
        errorCallback({
            error: res.response.data.Message,
            status: res.response.status,
            statusText: res.response.putstatusText
        })
    }
    else {
        errorCallback({
            error:{message: 'Facing some issue, please try after sometime'},
            status: 408,
            statusText: ''
        })
    }
}

const instance = axios.create();
instance.defaults.timeout = 15000;

let Api = {
    doGet(location, body, successCallback, errorCallback, token) {

        let url = getLocation(location) + ObjectHelper.getQueryString(body);
        let headers = {
            "Content-Type": "application/json",
            "UserLanguage": I18n.t('api.language')
        };
        if (token) {
            headers["UserToken"] = `${token}`;
        }

        instance.get(url, {
            headers, 
            withCredentials: true})
            .then(status)
            .then(successCallback)
            .catch(res => errorCall(res, errorCallback));
    },

    doPost(location, body, successCallback, errorCallback, token, firebaseToken) {
        let url = getLocation(location);
        let headers = {
            "Content-Type": "application/json",
            "UserLanguage": I18n.t('api.language')
        };
        if (token) {
            headers["UserToken"] = `${token}`;
        }
        if(firebaseToken){
            headers["DeviceInfo"] = `${firebaseToken}`;
        }
        instance.post(url, JSON.stringify(body),{
            headers,
            withCredentials: true
        }).then(status)
            .then(successCallback)
            .catch(res => errorCall(res, errorCallback));
    },
    
}
export default Api;
