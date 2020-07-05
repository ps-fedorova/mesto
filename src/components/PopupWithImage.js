import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage, popupCardName) {
    super(popupSelector);
    this._popupImage = popupImage;
    this._popupCardName = popupCardName;
  }

  open({link, name}) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCardName.textContent = name;

    super.open();
  }
}
