/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const xhr = new XMLHttpRequest();
xhr.responseType = 'json';


const createRequest = (options = {}) => {

    let { url, method, data, callback } = options;
  
    let curUrl = url;
    let err = undefined;
    
    try {
        if (method === 'GET') {
            let extUrl = '';
            for (key in data) {
                extUrl += (extUrl.length === 0 ? '' : '&') + key + '=' + data[key];
            }        
            curUrl = curUrl + '?' + extUrl;                   
        }   
        xhr.open(method, curUrl);
        xhr.send(data);
    } catch (err) {
        callback(err);
    }
 
    xhr.addEventListener('load', () => {                              
        if (callback) {
            callback(err, xhr.response);
        }        
    });
};
