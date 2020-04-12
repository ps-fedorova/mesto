// 1 Открыть попап

const popup = document.querySelector('.popup'); // объявили попап
const profileButtonEdit = document.querySelector('.profile__button-edit'); // объявили кнопку "Редактировать профиль"

function openPopup() { //открыть
    popup.classList.add('popup_opened'); // добавили модификатор
    popup.classList.remove('popup_closed'); // удалили модификатор
}
profileButtonEdit.addEventListener('click', openPopup); // Метод addEventListener() присоединяет обработчик события к определенному элементу


// 2 Редактировать поля ввода

// 2.1 Находим поля формы в DOM (попап)
let nameInput = document.querySelector('.popup__input_user-name');
let jobInput = document.querySelector('.popup__input_user-about');
// 2.2 Выбераем элементы, куда должны быть вставлены значения полей
let name = document.querySelector('.profile__user-info-name');
let job = document.querySelector('.profile__user-info-about');
// 2.3 Форме ввода из попапа задаем значения "по умолчанию" со страницы
function reset() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}
reset();


// 3 Закрыть попап

const popupClose = document.querySelector('.popup__close'); // объявили крестик

function closePopup() { // закрыть крестиком
    popup.classList.add('popup_closed');
    popup.classList.remove('popup_opened');
    reset();
}
popupClose.addEventListener('click', closePopup);

//закрыть кликом по фону - разобраться как это сделать

function closeEscPopup(evt) { // закрыть кнопкой Esc
    if (evt.keyCode == 27) {
        popup.classList.add('popup_closed');
        popup.classList.remove('popup_opened');
        reset();
    }
}
document.addEventListener('keydown', closeEscPopup);


// 4 Сохраненить изменения

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    name.textContent = nameInput.value
    job.textContent = jobInput.value
    closePopup();
    closeEscPopup(evt);
}


// Строчку ниже написала только чтобы в консоли не было ошибок.
let formElement = document.querySelector('.popup__form');
// 5  Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
