import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  cardContainer,
  initialCards,
  jobInput,
  nameInput,
  popupButtonAddCard,
  popupButtonEdit,
  popupFormCardNew,
  popupFormEditProfile,
  popupInputNewCard,
  popupInputNewCardLink,
  popupParameters,
  profileButtonAdd,
  profileButtonEdit,
  profileJob,
  profileName
} from '../utils/constants.js'

// ФУНКЦИИ
const handleProfileFormSubmit = (formValues) => {
  userInfo.setUserInfo(formValues);
}

const addNewCard = () => {

  const inputValues = {
    name: popupInputNewCard.value,
    link: popupInputNewCardLink.value
  };

  const card = new Card(inputValues, '#card-template', handleCardClick).generateCard();
  cardContainer.prepend(card);
}

const profileValidator = new FormValidator(popupParameters, popupFormEditProfile); // валидация инпутов попапа "Редактировать профиль"
const cardValidator = new FormValidator(popupParameters, popupFormCardNew); // валидация инпутов попапа "Добавить карточку"
const popupWithImage = new PopupWithImage('.popup__zoom-card'); // попап с картинкой
const profilePopup = new PopupWithForm('.popup__edit-profile', handleProfileFormSubmit); // попап с формой "Редактировать профиль"
const cardPopup = new PopupWithForm('.popup__add-card', addNewCard); // попап с формой "Добавить карточку"

const userInfo = new UserInfo({
  userName: profileName,
  userDescription: profileJob,
});


// Рендерить данные профиля
const renderProfilePopup = () => {
  const profileElement = userInfo.getUserInfo();

  nameInput.value = profileElement.name; // name="name" из файла html
  jobInput.value = profileElement.about; // name="about" из файла html

  profileValidator.clearError();
  popupButtonEdit.classList.remove('popup__button_disabled'); // включить кнопку "Сохранить" при первом открытии

  profilePopup.open();
}


//  Карточки
const handleCardClick = (evt) => {
  popupWithImage.openPopupImage(evt);
}

// Загрузка карточек "по умолчанию" (отрисовка элементов на странице)
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card-template', handleCardClick).generateCard();
    cardsList.addItem(card);
  }
}, '.card-container');


// Рендерить новую карточку
const renderCardPopup = () => {
  popupButtonAddCard.classList.add('popup__button_disabled'); // выключить кнопку "Сохранить"
  popupInputNewCard.value = '';
  popupInputNewCardLink.value = '';
  cardValidator.clearError();

  cardPopup.open();
}


// СЛУШАТЕЛИ
profileButtonEdit.addEventListener('click', renderProfilePopup); // Рендерить данные профиля
profileButtonAdd.addEventListener('click', renderCardPopup); // Рендерить новую карточку

// ВЫЗОВ ФУНКЦИЙ
cardsList.renderItems(); // Загрузка карточек
profileValidator.enableValidation(); // Валидация полей ввода попапа "Редактировать профиль"
cardValidator.enableValidation(); // Валидация полей ввода попапа "Добавить карточку"

