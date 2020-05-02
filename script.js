// Карточки по умолчанию

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



// КОНСТАНТЫ

const popupImage = document.querySelector('.popup__image'); // картинка
const popupCardName = document.querySelector('.popup__card-name'); // подпись к картинке
const popupEdit = document.querySelector('.popup__edit-profile'); // попап "Редактировать профиль"
const popupAddCard = document.querySelector('.popup__add-card'); // попап "Добавить карточку"
const popupZoomCard = document.querySelector('.popup__zoom-card'); // попап "Картинка-зум"
const formCard = document.querySelector('.popup__form-card');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_user-name'); // поля формы в DOM (попап)
const jobInput = document.querySelector('.popup__input_user-about'); //поля формы в DOM (попап)
const profileName = document.querySelector('.profile__user-info-name'); // элементы, куда должны быть вставлены значения полей
const profileJob = document.querySelector('.profile__user-info-about'); //элементы, куда должны быть вставлены значения полей
const popupInputNewCard = document.querySelector('.popup__input_new-card');
const popupInputNewCardLink = document.querySelector('.popup__input_new-card-link');
const cardTemplate = document.querySelector('#card-template').content;
const cards = document.querySelector('.cards');
const popupClose = document.querySelector('.popup__close'); //  крестик
const profileButtonAdd = document.querySelector('.profile__button-add'); // кнопка "Добавить карточку"
const profileButtonEdit = document.querySelector('.profile__button-edit'); // кнопка "Редактировать профиль"

/*костыли*/
// const popupCloseEdit = document.querySelector('.popup__close-edit'); //  крестик "Редактировать профиль"
// const popupCloseAdd = document.querySelector('.popup__close-add'); //  крестик "Добавить карточку"
// const popupCloseZoom = document.querySelector('.popup__close-zoom'); //  крестик "Картинка-зум"


// Функция открытия и закрытия попапа
function openOrClosePopup(popup) {
    popup.classList.toggle('popup_opened');
};

// Удалить карточку
function cardDelete(evt) {
    //cards.removeChild(evt.target.closest('.card')); // аналог
    evt.target.closest('.card__button-delete').parentElement.remove();
};

// Поставить лайк
function like(evt) {
    evt.target.classList.toggle('card__button-like_solid');;
}

// Зум картинки
function zoom(evt) {
    openOrClosePopup(popupZoomCard);
    popupImage.src = evt.target.src;
    popupCardName.textContent = evt.target.parentNode.textContent;
}

// Функция создания элемента карточки
function createCard(name, link) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardName = cardElement.querySelector('.card__name');
    const cardButtonDeleteVector = cardElement.querySelector('.card__button-delete-vector');
    const cardButtonLike = cardElement.querySelector('.card__button-like');
    cardName.textContent = name;
    cardImage.src = link;

    cardButtonDeleteVector.addEventListener('click', cardDelete);
    cardButtonLike.addEventListener('click', like);
    cardImage.addEventListener('click', zoom);

    return cardElement;
};

// Функция добавления карточки с помощью метода forEach
function addCards() {
    initialCards.forEach((card) => {
        const name = card.name;
        const link = card.link;
        cards.append(createCard(name, link));
    })
};

/*
// Функция добавления карточки через цикл for
function addCards() {
for (let i = 0; i < initialCards.length; i++) {
  const card = initialCards[i];
  const name = card.name;
  const link = card.link;
  cards.append(createCard(name, link));
};
}
addCards();
*/

// Добавить карточку
profileButtonAdd.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('profile__button-add') || evt.target.classList.contains('profile__button-add-vector')) {
        openOrClosePopup(popupAddCard); // добавить карточку
    };
});

// Редактировать профиль
function setFormData() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

profileButtonEdit.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('profile__button-edit') || evt.target.classList.contains('profile__button-edit-vector')) {
        openOrClosePopup(popupEdit);
        setFormData();
    };
});

// Сохраненить изменения данных о пользователе
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, чтобы страница не перезагружалась.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    openOrClosePopup(popupEdit);
};

// Добавить новую карточку
function addNewCard(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, чтобы страница не перезагружалась.
    cards.prepend(createCard(popupInputNewCard.value, popupInputNewCardLink.value));

    openOrClosePopup(popupAddCard); // закрыть попап

    popupInputNewCard.value = ''; // значения "по умолчанию"
    popupInputNewCardLink.value = '';
};



// Слушатели

// закрыть по крестику и кликом по фону
document.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
        openOrClosePopup(evt.target.closest('.popup')); // передали ближайший попап
    };
});

// закрыть кнопкой Esc
document.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
        const popupOpened = document.querySelector('.popup_opened'); // открытый попап
        openOrClosePopup(popupOpened);
    }
});

/* Мне кажется, это костыли, но это тоже работает.
popupCloseEdit.addEventListener('click', function() {
    openOrClosePopup(popupEdit);
});

popupCloseAdd.addEventListener('click', function() {
    openOrClosePopup(popupAddCard);
});

popupCloseZoom.addEventListener('click', function() {
    openOrClosePopup(popupZoomCard);
});
*/


formElement.addEventListener('submit', formSubmitHandler);
formCard.addEventListener('submit', addNewCard);


// Загрузка карточек "по умолчанию"
addCards();