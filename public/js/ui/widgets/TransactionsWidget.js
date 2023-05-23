/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
    /**
    * Устанавливает полученный элемент
    * в свойство element.
    * Если переданный элемент не существует,
    * необходимо выкинуть ошибку.
    * */
    constructor( element ) {
        if (element) {
            this.element = element;
            this.registerEvents();
        } else {
            console.log("Ошибка! Элемент не существует.");
        }
    }
    /**
    * Регистрирует обработчики нажатия на
    * кнопки «Новый доход» и «Новый расход».
    * При нажатии вызывает Modal.open() для
    * экземпляра окна
    * */
    registerEvents() {
        const createIncomeButton = document.querySelector(".create-income-button");
        createIncomeButton.onclick = () => {
            App.getModal('newIncome').open();
        }

        const createExpenseButton = document.querySelector(".create-expense-button");
        createExpenseButton.onclick = () => {
            App.getModal('newExpense').open();
        }
    }
}
