// Редактирование данных пользователя


// 1 Открыть и закрыть форму

let profileButtonEdit = document.querySelector('.profile__button-edit'); //кнопка "Редактировать профиль"
let popup = document.querySelector('.popup'); //попап
let popupClose = document.querySelector('.popup__close'); //крестик


profileButtonEdit.addEventListener('click', function(evt) { //открыть
    popup.classList.add('popup_opened'); // добавить модификатор
    popup.classList.remove('popup_closed'); // удалить модификатор

})

popupClose.addEventListener('click', function() { //закрыть
    popup.classList.add('popup_closed');
    popup.classList.remove('popup_opened');
})

document.addEventListener('keydown', function(evt) { // закрыть кнопкой Esc
    if (evt.keyCode == 27) {
        popup.classList.add('popup_closed');
        popup.classList.remove('popup_opened');
    }
})





/*popupEdit.removeAttribute('display'); //удалили атрибут dysplay*/








/*let formElement = // Воспользуйтесь методом querySelector()

    // Обработчик «отправки» формы, хотя пока
    // она никуда отправляться не будет
    function formSubmitHandler(evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        // Так мы можем определить свою логику отправки.
        // О том, как это делать, расскажем позже.

        // Находим поля формы в DOM
        let nameInput = // Воспользуйтесь инструментом .querySelector()
            let jobInput = // Воспользуйтесь инструментом .querySelector()

                // Получите значение полей из свойства value

                // Выберите элементы, куда должны быть вставлены значения полей

                // Вставьте новые значения с помощью textContent
    }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);*/