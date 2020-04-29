// 0 Карточки по умолчанию

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;


for (let i = 0; i < initialCards.length; i++) {
    const cardElement = cardTemplate.cloneNode(true);
    let cardImage = cardElement.querySelector('.card__image');
    let cardName = cardElement.querySelector('.card__name');

    cardImage.src = initialCards[i].link;
    cardName.textContent = initialCards[i].name;
    cards.append(cardElement);
};



//КОНСТАНТЫ

const popup = document.querySelectorAll('.popup'); // объявили попап
const profileButtonEdit = document.querySelector('.profile__button-edit'); // кнопка "Редактировать профиль"
const profileButtonAdd = document.querySelector('.profile__button-add'); // кнопка "Добавить карточку"
const popupImage = document.querySelector('.popup__image'); // картинка
const popupCardName = document.querySelector('.popup__card-name'); // подпись к картинке
const popupEdit = document.querySelector('.popup__edit-profile'); // попап "Редактировать профиль"
const popupAddCard = document.querySelector('.popup__add-card'); // попап "Добавить карточку"
const popupZoomCard = document.querySelector('.popup__zoom-card'); // попап "Картинка-зум"
const popupClose = document.querySelector('.popup__close'); //  крестик
const formCard = document.querySelector('.popup__form-card');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_user-name'); // поля формы в DOM (попап)
const jobInput = document.querySelector('.popup__input_user-about'); //поля формы в DOM (попап)
const profileName = document.querySelector('.profile__user-info-name'); // элементы, куда должны быть вставлены значения полей
const profileJob = document.querySelector('.profile__user-info-about'); //элементы, куда должны быть вставлены значения полей


// 1 Открыть попапы, поставить лайк, удалить карточку

//classList.contains — возвращает логическое значение,
// указывающее, имеет ли элемент указанный класс или нет.

document.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('profile__button-add') || evt.target.classList.contains('profile__button-add-vector')) {
        popupAddCard.classList.toggle('popup_opened'); // добавить карточку
        popupAddCard.classList.toggle('popup_closed');

    } else if (evt.target.classList.contains('profile__button-edit') || evt.target.classList.contains('profile__button-edit-vector')) {
        popupEdit.classList.toggle('popup_opened'); // редактировать профиль
        popupEdit.classList.toggle('popup_closed');

    } else if (evt.target.classList.contains('card__image')) {
        popupZoomCard.classList.toggle('popup_opened'); // зум картинки
        popupZoomCard.classList.toggle('popup_closed');
        //popupImage.src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg';
        //popupCardName.textContent = 'Байкал';
        popupImage.src = evt.target.src;
        popupCardName.textContent = evt.target.parentNode.textContent;

    } else if (evt.target.classList.contains('card__button-like')) {
        evt.target.classList.toggle('card__button-like_solid'); // поставить лайк

    } else if (evt.target.classList.contains('card__button-delete-vector')) {
        cards.removeChild(evt.target.closest('.card')); // удалить карточку
    }
});


// 2 Закрыть попап

function popupCloseFunction() {
    for (let i = 0; popup.length > i; i++) {
        popup[i].classList.remove('popup_opened');
        popup[i].classList.add('popup_closed');
    }
}

// закрыть по крестику и кликом по фону
document.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup__close')) {
        popupCloseFunction();
    } else if (evt.target.classList.contains('popup')) {
        popupCloseFunction();
    }
});

// закрыть кнопкой Esc
document.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
        popupCloseFunction()
    }
});


/* КОД РАБОТАЛ. Но он закрывает 1 попап
function popupCloseFunction() {
    popup.classList.add('popup_closed');
    popup.classList.remove('popup_opened');
    reset();
}
document.addEventListener('click', function(evt) {
    if (evt.target === popupClose || evt.target === popup) {
        popupCloseFunction()
    }
});
document.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
        popupCloseFunction()
    }
});*/


// 3 Редактировать поля ввода о пользователе

function reset() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}
reset();


// 4 Сохраненить изменения

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, чтобы страница не перезагружалась.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupCloseFunction();
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


// 5 Добавить новую карточку

function addNewCard(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, чтобы страница не перезагружалась.
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__name').textContent = document.querySelector('.popup__input_new-card').value;
    cardElement.querySelector('.card__image').src = document.querySelector('.popup__input_new-card-link').value;
    cards.prepend(cardElement);
    popupCloseFunction(); // закрыть попап
    document.querySelector('.popup__input_new-card').value = ''; // значения "по умолчанию"
    document.querySelector('.popup__input_new-card-link').value = '';
}
formCard.addEventListener('submit', addNewCard);
