import Popup from './Popup.js';

const popupZoomCard = document.querySelector('.popup__zoom-card'); // попап "Картинка-зум"
const popupImage = popupZoomCard.querySelector('.popup__image'); // картинка
const popupCardName = popupZoomCard.querySelector('.popup__card-name'); // подпись к картинке

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
  }

  openPopupImage(evt) {
    popupCardName.textContent = evt.target.alt;
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    super.open();
  }
}
