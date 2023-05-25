/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
    /**
    * Вызывает родительский конструктор и
    * метод renderAccountsList
    * */
    constructor(element) {
        super(element);
        this.renderAccountsList();
    }

    /**
    * Получает список счетов с помощью Account.list
    * Обновляет в форме всплывающего окна выпадающий список
    * */
    renderAccountsList() {
        let data = {};    
        Account.list(data, (err, response) => {            
          if (response && response.success) {                      
            const elSelect = this.element.querySelector('.accounts-select')
            if (elSelect) {
              elSelect.length = 0;
              for (let item of response.data) {
                let newOption = new Option(item.name, item.id);
                elSelect.append(newOption);
              }
            }        
          }
        });
    }

    /**
    * Создаёт новую транзакцию (доход или расход)
    * с помощью Transaction.create. По успешному результату
    * вызывает App.update(), сбрасывает форму и закрывает окно,
    * в котором находится форма
    * */
    onSubmit(data) {
        Transaction.create(data, (err, response) => {
            if (response && response.success === true) {
                // закрываем форму
                App.getModal('newIncome').close();
                App.getModal('newExpense').close();
                // сбрасываем данные формы
                // document.forms['new-income-form'].reset();
                // document.forms['new-expense-form'].reset();
                this.element.reset();
                // обновляем данные аккаунта
                App.update();
            }
        });
    }
}
