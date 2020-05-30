import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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

const popupParameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
}

const profileValidator = new FormValidator(popupParameters, popupFormEditProfile);
const cardValidator = new FormValidator(popupParameters, popupFormCardNew);

// ОБЪЯВЛЕНИЕ ФУНКЦИЙ

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

// Установить данные "по умолчанию" для новой карточки
function setNewCard() {
  popupInputNewCard.value = '';
  popupInputNewCardLink.value = '';
  cardValidator.enableValidation();
  popupButtonAddCard.classList.add('popup__button_disabled'); // отключить кнопку "Создать" при пустых значениях
}

// Добавить начальные карточки
function addCards() {
  initialCards.forEach((item) => {
    const card = new Card(item, '#card-template').generateCard();
    cardContainer.append(card);
  });
};

// Добавить новую карточку
function addNewCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, чтобы страница не перезагружалась.
  const card = new Card({
    name: popupInputNewCard.value,
    link: popupInputNewCardLink.value
  }, '#card-template').generateCard();
  cardContainer.prepend(card);
  openOrClosePopup(popupAddCard); // закрыть попап
};

// Установить данные "по умолчанию" для профиля
function setFormData() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profileValidator.enableValidation();
  popupButtonEdit.classList.remove('popup__button_disabled'); // включить кнопку "Сохранить" при первом открытии
};

// Добавить данные о пользователе
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, чтобы страница не перезагружалась.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  openOrClosePopup(popupEdit);
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

// сохранить новую карточку
popupFormCardNew.addEventListener('submit', addNewCard);

// добавить карточку
profileButtonAdd.addEventListener('click', () => {
  setNewCard();
  openOrClosePopup(popupAddCard);
});

// сохранить данные профиля
popupFormEditProfile.addEventListener('submit', formSubmitHandler);


// ВЫЗОВ ФУНКЦИЙ
addCards(); // Загрузка карточек "по умолчанию"
profileValidator.enableValidation(); // Валидация полей ввода попапа "Редактировать профиль"
cardValidator.enableValidation(); // Валидация полей ввода попапа "Добавить карточку"


// ЭКСПОРТ
export { popupZoomCard, popupImage, popupCardName, openOrClosePopup };
