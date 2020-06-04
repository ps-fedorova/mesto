import { openOrClosePopup } from './utils.js';

const popupZoomCard = document.querySelector('.popup__zoom-card'); // попап "Картинка-зум"
const popupImage = popupZoomCard.querySelector('.popup__image'); // картинка
const popupCardName = popupZoomCard.querySelector('.popup__card-name'); // подпись к картинке

export class Card {
  constructor(date, cardSelector) {
    this._name = date.name;
    this._link = date.link;
    this._cardSelector = cardSelector;
  }

  // Вернуть разметку
  _getTemplate() {
    const card = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return card;
  }

  // Поставить лайк
  _like(evt) {
    evt.target.classList.toggle('card__button-like_solid');
  }

  // Зум картинки
  _zoom(evt) {
    popupCardName.textContent = evt.target.alt;
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    openOrClosePopup(popupZoomCard);
  }

  // Удалить карточку
  _deleteCard(evt) {
    const card = evt.target.closest('.card');
    // И ее слушатели тоже нужно удалить
    card.querySelector('.card__button-delete-vector').removeEventListener('click', this._deleteCard);
    card.querySelector('.card__button-like').removeEventListener('click', this._like);
    card.querySelector('.card__image').removeEventListener('click', this._zoom);

    card.remove();
  }

  // Установить слушатели событий
  _setEventListeners() {
    this._card.querySelector('.card__button-delete-vector').addEventListener('click', this._deleteCard);
    this._card.querySelector('.card__button-like').addEventListener('click', this._like);
    this._card.querySelector('.card__image').addEventListener('click', this._zoom);
  }

  // Подготовить карточку к публикации
  generateCard() {
    this._card = this._getTemplate();

    this._card.querySelector('.card__name').textContent = this._name;
    this._card.querySelector('.card__image').src = this._link;
    this._card.querySelector('.card__image').alt = this._name;

    this._setEventListeners();

    return this._card;
  }
}
