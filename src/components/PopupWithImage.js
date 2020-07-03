import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage, popupCardName) {
    super(popupSelector);
    this._popupImage = popupImage;
    this._popupCardName = popupCardName;
  }

  open(evt) {
    evt.preventDefault();

    this._popupImage.src = evt.target.src;
    this._popupImage.alt = evt.target.alt;
    this._popupCardName.textContent = evt.target.alt;

    super.open();
  }
}
