import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector('.popup__image'); // картинка
    this._popupCardName = this._popupSelector.querySelector('.popup__card-name'); // подпись к картинке
  }

  openPopupImage(evt) {
    this._popupCardName.textContent = evt.target.alt;
    this._popupImage.src = evt.target.src;
    this._popupImage.alt = evt.target.alt;
    super.open();
  }
}
