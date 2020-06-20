/* Project 1 HSR CAS Frontend Engineering 2020
   André Zurkirchen
   June 2020
 */

class HttpService {
    ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});

        return fetch(url, {
            method: method,
            headers: fetchHeaders, body: JSON.stringify(data)
        }).then(x => {
            return x.json();
        });
    }
}

export const httpService = new HttpService();