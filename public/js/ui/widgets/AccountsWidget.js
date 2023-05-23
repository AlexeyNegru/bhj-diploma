/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
    /**
    * Устанавливает текущий элемент в свойство element
    * Регистрирует обработчики событий с помощью
    * AccountsWidget.registerEvents()
    * Вызывает AccountsWidget.update() для получения
    * списка счетов и последующего отображения
    * Если переданный элемент не существует,
    * необходимо выкинуть ошибку.
    * */
    constructor( element ) {
        if (element) {
            this.element = element;
            this.registerEvents();
            this.update();
        } else {
            console.log("Ошибка! Элемент не существует.");
        }
    }

    /**
    * При нажатии на .create-account открывает окно
    * #modal-new-account для создания нового счёта
    * При нажатии на один из существующих счетов
    * (которые отображены в боковой колонке),
    * вызывает AccountsWidget.onSelectAccount()
    * */
    registerEvents() {
        document.addEventListener("click", e => {
            if (e.target.classList.contains("create-account")) {
                App.getModal('createAccount').open();
            }
            const parent = e.target.closest(".account");
            if (parent) {
                this.onSelectAccount(parent);
            }
        });
    }

    /**
    * Метод доступен только авторизованным пользователям
    * (User.current()).
    * Если пользователь авторизован, необходимо
    * получить список счетов через Account.list(). При
    * успешном ответе необходимо очистить список ранее
    * отображённых счетов через AccountsWidget.clear().
    * Отображает список полученных счетов с помощью
    * метода renderItem()
    * */
    update() {
        const data = User.current();
        if (data) {
            Account.list(data, (err, response) => {
                if (response && response.success === true) {
                    this.clear();
                    for (let i = 0; i < response.data.length; i++) {
                        this.renderItem(response.data[i]);
                    }
                }
            });
        }
    }

    /**
    * Очищает список ранее отображённых счетов.
    * Для этого необходимо удалять все элементы .account
    * в боковой колонке
    * */
    clear() {
        const accounts = document.querySelectorAll('.account'); // обращаю внимание на точку
        if (accounts) {
            accounts.forEach( e => e.remove() );
        }
    }

    /**
    * Срабатывает в момент выбора счёта
    * Устанавливает текущему выбранному элементу счёта
    * класс .active. Удаляет ранее выбранному элементу
    * счёта класс .active.
    * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
    * */
    onSelectAccount( element ) {

        // ищем активный счёт и удаляем у него .active
        const activeAccount = document.querySelector('.active'); // обращаю внимание на точку
        if (activeAccount) {
            activeAccount.classList.remove('.active');
        }

        // добавляем класс .active на кликнутый элемент
        element.classList.add('.active');

        App.showPage( 'transactions', { account_id: element.dataset.id } );
    }

    /**
    * Возвращает HTML-код счёта для последующего
    * отображения в боковой колонке.
    * item - объект с данными о счёте
    * */
    getAccountHTML(item) {
        return `
        <li class="account" data-id="${item.id}">
            <a href="#">
                <span>${item.name}</span> /
                <span>${item.sum} ₽</span>
            </a>
        </li>
        `;
    }

    /**
    * Получает массив с информацией о счетах.
    * Отображает полученный с помощью метода
    * AccountsWidget.getAccountHTML HTML-код элемента
    * и добавляет его внутрь элемента виджета
    * */
    renderItem(data) {
        const accountsPanel = document.querySelector('.accounts-panel');
        accountsPanel.insertAdjacentHTML("beforeEnd", this.getAccountHTML(data));
    }
}
