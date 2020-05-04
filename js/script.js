/* "Вынести добавление в разметку в отдельный метод,
т.к. этот код повторяется и при отрисовке дефолтных карт и при добавлении пользовательской карты"

новая карточка у меня добавляется методом prepend(), а дефолтные - .append().
Где-то в лекциях написано, что метод .append() предпочтительнее, и где можно, нужно его использовать.
Если в данном случае разумно все карточки добавлять одним методом - переделаю.
Я не очень хорошо пока соображаю, но очень стараюсь разобраться. Сообщение это потом удалю.*/

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
const popupInputNewCardAlt = document.querySelector('.popup__input_new-card');
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.card-container');
const profileButtonAdd = document.querySelector('.profile__button-add'); // кнопка "Добавить карточку"
const profileButtonEdit = document.querySelector('.profile__button-edit'); // кнопка "Редактировать профиль"


// Функция открытия и закрытия попапа
function openOrClosePopup(popup) {
    popup.classList.toggle('popup_opened');
};

// Удалить карточку
function cardDelete(evt) {
    evt.target.closest('.card').remove();
};

// Поставить лайк
function like(evt) {
    evt.target.classList.toggle('card__button-like_solid');
}

// Зум картинки
function zoom(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = `проблема со ссылкой на изображение "${evt.target.parentNode.textContent}"`;
    popupCardName.textContent = evt.target.parentNode.textContent;
    openOrClosePopup(popupZoomCard);
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
    cardImage.alt = `Проблема со ссылкой на изображение "${name}"`;

    cardButtonDeleteVector.addEventListener('click', cardDelete);
    cardButtonLike.addEventListener('click', like);
    cardImage.addEventListener('click', zoom);

    return cardElement;
};

// Функция добавления карточки с помощью метода forEach через деструктуризацию
function addCards() {
    initialCards.forEach(({ name, link }) => cardContainer.append(createCard(name, link)));
};


/*
// Функция добавления карточки с помощью метода forEach
function addCards() {

  initialCards.forEach((card) => {
      const name = card.name;
      const link = card.link;
      cards.append(createCard(name, link));
  })
};
*/
/*
// Функция добавления карточки через цикл for
function addCards() {
for (let i = 0; i < initialCards.length; i++) {
  const card = initialCards[i];
  const name = card.name;
  const link = card.link;
  cardContainer.append(createCard(name, link));
};
}
addCards();
*/
/*
// Добавить карточку аналог для сравнения
profileButtonAdd.addEventListener('click', function() {
    openOrClosePopup(popupAddCard);
});
*/


// добавить карточку
profileButtonAdd.addEventListener('click', () => openOrClosePopup(popupAddCard));

// Редактировать профиль
function setFormData() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

profileButtonEdit.addEventListener('click', () => {
    setFormData();
    openOrClosePopup(popupEdit);
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
    cardContainer.prepend(createCard(popupInputNewCard.value, popupInputNewCardLink.value));

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
    const popupOpened = document.querySelector('.popup_opened'); // открытый попап
    if (evt.keyCode === 27 && popupOpened) {
        openOrClosePopup(popupOpened);
    }
});


formElement.addEventListener('submit', formSubmitHandler);
formCard.addEventListener('submit', addNewCard);


// Загрузка карточек "по умолчанию"
addCards();
