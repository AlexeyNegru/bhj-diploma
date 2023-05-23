/**
* Класс Account наследуется от Entity.
* Управляет счетами пользователя.
* Имеет свойство URL со значением '/account'
* */
class Account extends Entity {
    static URL = '/account';
    /**
    * Получает информацию о счёте
    * */
    static get(id = '', callback) {
        createRequest({
            url: `${this.URL}/${id}`,
            method: 'GET',
            callback: ( err, response ) => {
                /*
                при успешном выполнении err = null, response содержит данные ответа
                */
                if (response && response.success === true) {
                    callback(err, response);
                } else {
                    console.log( err );
                }
            }
        });
    }
}
