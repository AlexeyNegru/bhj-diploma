/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    if (options.method === 'GET') {
        let url = ""; // формируемая строка отправки запроса

        if (options.data) {
            Object.keys(options.data).forEach(key => { // перебираем объект по ключам
                url += `${key}=${options.data[key]}&`;
            });
        }

        try {
            xhr.open( 'GET', `${options.url}?${url}` );
            xhr.send();
        } catch (e) {
            console.log(e);
        }

    } else {
        const formData = new FormData();

        if (options.data) {
            Object.keys(options.data).forEach(key => { // перебираем объект по ключам
                formData.append( key, options.data[key] );
            });
        }

        try {
            xhr.open( options.method, options.url );
            xhr.send( formData );
        } catch (e) {
            console.log(e);
        }
    }

    xhr.onload = () => {
        if (options.callback !== undefined) {
            options.callback(xhr.response.error, xhr.response);
        }
    }
};
