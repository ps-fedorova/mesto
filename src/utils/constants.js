// ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ


export const apiUrl = 'https://mesto.nomoreparties.co/v1/cohort-12';
export const token = '2ecad59e-1d15-4621-aac6-769c45c3d932';


/*export let initialCards = [{
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
];*/

// Профиль
const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__user-info-name'); // элементы, куда должны быть вставлены значения полей
export const profileJob = profile.querySelector('.profile__user-info-about'); //элементы, куда должны быть вставлены значения полей
export const profileAvatar = profile.querySelector('.profile__avatar-picture'); //элементы, куда должны быть вставлены значения полей
export const profileButtonAdd = profile.querySelector('.profile__button-add'); // кнопка "Добавить карточку"
export const profileButtonEdit = profile.querySelector('.profile__button-edit'); // кнопка "Редактировать профиль"

// Карточки
export const cardContainer = document.querySelector('.card-container'); // контейнер с карточками

// Попапы
const popupEdit = document.querySelector('.popup__edit-profile'); // попап "Редактировать профиль"
export const popupFormEditProfile = popupEdit.querySelector('.popup__form-edit-profile'); // форма
export const nameInput = popupFormEditProfile.querySelector('.popup__input_user-name'); // поля формы в DOM (попап)
export const jobInput = popupFormEditProfile.querySelector('.popup__input_user-about'); //поля формы в DOM (попап)
export const popupButtonEdit = popupFormEditProfile.querySelector('.popup__button'); // кнопка "Сохранить"

const popupAddCard = document.querySelector('.popup__add-card'); // попап "Добавить карточку"
export const popupFormCardNew = popupAddCard.querySelector('.popup__form-card-new'); // форма
export const popupInputNewCard = popupFormCardNew.querySelector('.popup__input_new-card'); // поля формы в DOM (попап)
export const popupInputNewCardLink = popupFormCardNew.querySelector('.popup__input_new-card-link'); // поля формы в DOM (попап)
export const popupButtonAddCard = popupFormCardNew.querySelector('.popup__button'); // кнопка "Создать карточку"

export const popupParameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
}
