import axios from 'axios';
import cookies from 'js-cookie';
import moment from 'moment';
import { toast } from 'react-toastify';

export const isAccessTokenExpCookiePresent = () => {
    return !!cookies.get('accessTokenExp');
};

export const isAccessTokenExpired = () => {
    const tokenExpiresEpoch = cookies.get('accessTokenExp');

    if (!tokenExpiresEpoch) return true;
    return moment.utc().isAfter(moment.unix(tokenExpiresEpoch));
};

export const ensureAccessTokenIsValid = async () => {
    const tokenExpiresEpoch = cookies.get('accessTokenExp');
    if (tokenExpiresEpoch && moment.utc().isBefore(moment.unix(tokenExpiresEpoch))) {
        return true;
    }

    const uri = `/identity-api/token/refresh/access-token`;
    const action = async () => await axios.post(uri, {})

    return await requestHandler(action,
        {
            status: 200,
            callback: () => {
                console.log("Refreshed access token");
                return true;
            }
        },
        {
            status: -1,
            callback: () => false
        }
    );
}

export const getFormDataJsonFromEvent = event => {
    const formData = new FormData(event.target);

    let formDataJson = {};
    for (const [key, value] of formData.entries()) {
        formDataJson[key] = value;
    }

    return formDataJson;
}

/**
 * @async
 * @param {function: any} action 
 * @param  {Array.<{status: string, function: void}>} handlers 
 * @returns {Promise.<any>} result
 * @example 
 * await requestHandler(
 *  async () => axios.post('/some/uri'/),
 *  {status: 404, callback: async () => console.log('custom 404 error handling')},
 *  {status: 500, callback: async () => {window.location = '/error/500'}},
 * );
 */
export const requestHandler = async (action, ...handlers) => {
    handlers = handlers ?? [];
    let handlersDict = Object.assign({}, ...handlers.map
        (h => ({ [h.status]: h.callback })));
    
    const result = await action();
    if (result.status === 200) {
        if (handlersDict[200]) return await handlersDict[200](result);
        else return result.data;
    }
    
    const callback = handlersDict[result.status];
    if (callback) return await callback(result);

    const anyStatus = -1;
    const callbackForAnyStatus = handlersDict[anyStatus];
    if (callbackForAnyStatus) return callbackForAnyStatus(result);

    toast.error(`Error ${result.status}`);

    return result;
};

/**
 * @async
 * @param {function: any} action 
 * @param  {Array.<{status: string, function: void}>} handlers 
 * @returns {Promise.<any>} result
 * @example 
 * await authorizedRequestHandler(
 *  async () => axios.post('/some/uri'/),
 *  {status: 404, callback: async () => console.log('custom 404 error handling')},
 *  {status: 500, callback: async () => {window.location = '/error/500'}},
 * );
 */
export const authorizedRequestHandler = async (action, ...handlers) => {
    await ensureAccessTokenIsValid();
    return await requestHandler(action, ...handlers);
};