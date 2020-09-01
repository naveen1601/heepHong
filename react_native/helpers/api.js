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

        axios.get(url, {
            headers, 
            withCredentials: true})
            .then(status)
            .then(successCallback)
            .catch(res => errorCallback({
                responseJson: res.response?.data,
                status: res.response?.status,
            }));
    },

    doPost(location, body, successCallback, errorCallback, token) {
        let url = getLocation(location);
        let headers = {
            "Content-Type": "application/json",
            "UserLanguage": I18n.t('api.language')
        };
        if (token) {
            headers["UserToken"] = `${token}`;
        }
        axios.post(url, JSON.stringify(body),{
            headers,
            withCredentials: true
        }).then(status)
            .then(successCallback)
            .catch(res => errorCallback({
                error: res.response.data.Error,
                status: res.response.status,
            }));
    },
    
}
export default Api;
