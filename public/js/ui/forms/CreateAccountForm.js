/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
    /**
    * Создаёт счёт с помощью Account.create и закрывает
    * окно в случае успеха, а также вызывает App.update()
    * и сбрасывает форму
    * */
    onSubmit(data) {
        
        Account.create(data, (err, response) => {
            if (response && response.success) {
                // закрываем форму
                App.getModal('createAccount').close();
                // сбрасываем данные формы
                this.element.reset();
                // обновляем данные аккаунта
                App.update();
            }
        });
    }
}
