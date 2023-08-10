/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	
	const xhr = new XMLHttpRequest;
	xhr.responseType = 'json';
	let formData = new FormData();
	let url = options.url;
	if (options.method !== 'GET') {
		url += '?';
		for (let key in options.data) {
			url += `${key}=${options.data[key]}&`
			url = url.slice(0, -1);
		}
	} else {
		for (let key in options.data) {
			formData.append(key, options.data[key]);
		}
	}
			
	try {
		xhr.open(options.method, url);
		xhr.send(formData);
	} catch (err) {
		options.callback(err);
	}

	xhr.addEventListener('load', () => {options.callback(null, xhr.response)});
	xhr.addEventListener('error', () => {options.callback(xhr.statusText, null)});
}

