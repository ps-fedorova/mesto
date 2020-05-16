// ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ

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

// Профиль
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__user-info-name'); // элементы, куда должны быть вставлены значения полей
const profileJob = profile.querySelector('.profile__user-info-about'); //элементы, куда должны быть вставлены значения полей
const profileButtonAdd = profile.querySelector('.profile__button-add'); // кнопка "Добавить карточку"
const profileButtonEdit = profile.querySelector('.profile__button-edit'); // кнопка "Редактировать профиль"

// Карточки
const cardContainer = document.querySelector('.card-container'); // контейнер с карточками
const cardTemplate = cardContainer.querySelector('#card-template').content; // шаблон карточки

// Попапы
const popupEdit = document.querySelector('.popup__edit-profile'); // попап "Редактировать профиль"
const popupFormEditProfile = popupEdit.querySelector('.popup__form-edit-profile'); // форма
const nameInput = popupFormEditProfile.querySelector('.popup__input_user-name'); // поля формы в DOM (попап)
const jobInput = popupFormEditProfile.querySelector('.popup__input_user-about'); //поля формы в DOM (попап)
const popupButtonEdit = popupFormEditProfile.querySelector('.popup__button'); // кнопка "Сохранить"

const popupAddCard = document.querySelector('.popup__add-card'); // попап "Добавить карточку"
const popupFormCardNew = popupAddCard.querySelector('.popup__form-card-new'); // форма
const popupInputNewCard = popupFormCardNew.querySelector('.popup__input_new-card'); // поля формы в DOM (попап)
const popupInputNewCardLink = popupFormCardNew.querySelector('.popup__input_new-card-link'); // поля формы в DOM (попап)
const popupButtonAddCard = popupFormCardNew.querySelector('.popup__button'); // кнопка "Создать карточку"

const popupZoomCard = document.querySelector('.popup__zoom-card'); // попап "Картинка-зум"
const popupImage = popupZoomCard.querySelector('.popup__image'); // картинка
const popupCardName = popupZoomCard.querySelector('.popup__card-name'); // подпись к картинке


// ОБЪЯВЛЕНИЕ ФУНКЦИЙ

const getCardImage = (card) => card.querySelector('.card__image');
const getCardButtonDeleteVector = (card) => card.querySelector('.card__button-delete-vector');
const getCardButtonLike = (card) => card.querySelector('.card__button-like');

// Функция открытия и закрытия попапа
function openOrClosePopup(popup) {
  popup.classList.toggle('popup_opened');

  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('click', close);
    document.addEventListener('keydown', closeEsc);
  } else {
    document.removeEventListener('click', close);
    document.removeEventListener('keydown', closeEsc);
  }
};

// Поставить лайк
function like(evt) {
  evt.target.classList.toggle('card__button-like_solid');
}

// Зум картинки
function zoom(evt) {
  popupCardName.textContent = evt.target.alt;
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  openOrClosePopup(popupZoomCard);
}

// Удалить карточку
function deleteCard(evt) {
  const card = evt.target.closest('.card');
  getCardButtonDeleteVector(card).addEventListener('click', deleteCard);
  getCardButtonLike(card).addEventListener('click', like);
  getCardImage(card).addEventListener('click', zoom);
  card.remove();
};

// Создать элемент карточки
function createCard(name, link) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.card__name').textContent = name;
  getCardImage(card).src = link;
  getCardImage(card).alt = name;

  getCardButtonDeleteVector(card).addEventListener('click', deleteCard);
  getCardButtonLike(card).addEventListener('click', like);
  getCardImage(card).addEventListener('click', zoom);
  return card;
};

// Добавить карточки с помощью метода forEach через деструктуризацию
function addCards() {
  initialCards.forEach(({ name, link }) => cardContainer.append(createCard(name, link)));
};

// Убрать ошибку, если пользователь закрыл попап и при этом ввел невалидные данные
function clearError(formElement) {
  const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
  inputs.forEach(inputElement => {
    if (inputElement.classList.contains('popup__input_error')) {
      hideInputError(formElement, inputElement, 'popup__input_error', 'popup__error_visible');
    }
  });
}

// Установить данные "по умолчанию" для профиля
function setFormData() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearError(popupEdit);
  // включить кнопку "Сохранить" при первом открытии
  popupButtonEdit.classList.remove('popup__button_disabled');
};

// Добавить данные о пользователе
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, чтобы страница не перезагружалась.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  openOrClosePopup(popupEdit);
};

// Установить данные "по умолчанию" для новой карточки
function setNewCard() {
  popupInputNewCard.value = '';
  popupInputNewCardLink.value = '';
  clearError(popupAddCard);
  // отключить кнопку "Создать" при пустых значениях
  popupButtonAddCard.classList.add('popup__button_disabled');
}

// Добавить новую карточку
function addNewCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, чтобы страница не перезагружалась.
  cardContainer.prepend(createCard(popupInputNewCard.value, popupInputNewCardLink.value));
  openOrClosePopup(popupAddCard); // закрыть попап
};

// Закрыть по крестику и кликом по фону
function close(evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    openOrClosePopup(evt.target.closest('.popup'));
  };
};

// Закрыть кнопкой Esc
function closeEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' && popupOpened) {
    openOrClosePopup(popupOpened);
  }
}


// СЛУШАТЕЛИ

// редактировать профиль
profileButtonEdit.addEventListener('click', () => {
  setFormData();
  openOrClosePopup(popupEdit);
});

// добавить карточку
profileButtonAdd.addEventListener('click', () => {
  setNewCard();
  openOrClosePopup(popupAddCard);
});

// закрыть по крестику и кликом по фону
document.addEventListener('click', close);

// закрыть кнопкой Esc
document.addEventListener('keydown', closeEsc);

// сохранить данные профиля
popupFormEditProfile.addEventListener('submit', formSubmitHandler);

// сохранить новую карточку
popupFormCardNew.addEventListener('submit', addNewCard);


// ВЫЗОВ ФУНКЦИЙ

addCards(); // Загрузка карточек "по умолчанию"
