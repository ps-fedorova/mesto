// Профиль
const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__user-info-name'); // элементы, куда должны быть вставлены значения полей
export const profileJob = profile.querySelector('.profile__user-info-about'); //элементы, куда должны быть вставлены значения полей
export const profileAvatar = profile.querySelector('.profile__avatar-image'); //элементы, куда должны быть вставлены значения полей
export const profileButtonAdd = profile.querySelector('.profile__button-add'); // кнопка "Добавить карточку"
export const profileButtonEdit = profile.querySelector('.profile__button-edit'); // кнопка "Редактировать профиль"
export const profileButtonAvatar = profile.querySelector('.profile__avatar-edit'); // кнопка "Редактировать аватар"

// Карточки
export const cardContainer = document.querySelector('.card-container'); // контейнер с карточками

// Попапы
export const popupEditAvatar = document.querySelector('.popup__edit-avatar'); // попап-кнопка "Редактировать Аватар"
export const popupFormAvatar = popupEditAvatar.querySelector('.popup__form-avatar'); // форма
export const popupInputAvatarLink = popupEditAvatar.querySelector('.popup__input_avatar-link'); // поля формы в DOM (попап)
export const popupButtonAvatar = popupEditAvatar.querySelector('.popup__button'); // кнопка "Сохранить"

export const popupEdit = document.querySelector('.popup__edit-profile'); // попап "Редактировать профиль"
export const popupFormEditProfile = popupEdit.querySelector('.popup__form-edit-profile'); // форма
export const nameInput = popupFormEditProfile.querySelector('.popup__input_user-name'); // поля формы в DOM (попап)
export const jobInput = popupFormEditProfile.querySelector('.popup__input_user-about'); //поля формы в DOM (попап)
export const popupButtonEdit = popupFormEditProfile.querySelector('.popup__button'); // кнопка "Сохранить"

export const popupAddCard = document.querySelector('.popup__add-card'); // попап "Добавить карточку"
export const popupFormCardNew = popupAddCard.querySelector('.popup__form-card-new'); // форма
export const popupInputNewCard = popupFormCardNew.querySelector('.popup__input_new-card'); // поля формы в DOM (попап)
export const popupInputNewCardLink = popupFormCardNew.querySelector('.popup__input_new-card-link'); // поля формы в DOM (попап)
export const popupButtonAddCard = popupFormCardNew.querySelector('.popup__button'); // кнопка "Создать карточку"

export const popupAreYouSure = document.querySelector('.popup__are-you-sure'); // попап "Вы уверены?"
export const popupButtonConfirm = popupAreYouSure.querySelector('.popup__button'); // кнопка "Создать карточку"

export const popupZoomCard = document.querySelector('.popup__zoom-card'); // попап "Зум"
export const popupImage = popupZoomCard.querySelector('.popup__image'); // Большая картинка
export const popupCardName = popupZoomCard.querySelector('.popup__card-name'); // Подпись к большой картинке


export const popupParameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
}


export const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-12';
export const authorization = '2ecad59e-1d15-4621-aac6-769c45c3d932';
