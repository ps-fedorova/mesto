import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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

const popupParameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
}

const profileValidator = new FormValidator(popupParameters, popupFormEditProfile); // валидация инпутов попапа "Редактировать профиль"
const cardValidator = new FormValidator(popupParameters, popupFormCardNew); // валидация инпутов попапа "Добавить карточку"
const popupWithImage = new PopupWithImage('.popup__zoom-card'); // попап с картинкой

const userInfo = new UserInfo({
  userName: profileName,
  userDescription: profileJob,
});


// Профиль
const handleProfileFormSubmit = (formValues) => {
  userInfo.setUserInfo(formValues);
}

const renderProfilePopup = () => {
  const profileElement = userInfo.getUserInfo();

  nameInput.value = profileElement.name; // name="name" из файла html
  jobInput.value = profileElement.about; // name="about" из файла html

  profileValidator.clearError();
  popupButtonEdit.classList.remove('popup__button_disabled'); // включить кнопку "Сохранить" при первом открытии
  const profilePopup = new PopupWithForm('.popup__edit-profile', handleProfileFormSubmit); // попап с формой "Редактировать профиль"
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


// Добавить новую карточку
const addNewCard = () => {

  const inputValues = {
    name: popupInputNewCard.value,
    link: popupInputNewCardLink.value
  };

  const card = new Card(inputValues, '#card-template', handleCardClick).generateCard();
  cardContainer.prepend(card);
}

const renderCardPopup = () => {

  popupInputNewCard.value = '';
  popupInputNewCardLink.value = '';
  cardValidator.clearError();
  const cardPopup = new PopupWithForm('.popup__add-card', addNewCard); // попап с формой "Добавить карточку"
  cardPopup.open();
}


// СЛУШАТЕЛИ
profileButtonEdit.addEventListener('click', renderProfilePopup);
profileButtonAdd.addEventListener('click', renderCardPopup);

// ВЫЗОВ ФУНКЦИЙ
cardsList.renderItems(); // Загрузка карточек
profileValidator.enableValidation(); // Валидация полей ввода попапа "Редактировать профиль"
cardValidator.enableValidation(); // Валидация полей ввода попапа "Добавить карточку"

