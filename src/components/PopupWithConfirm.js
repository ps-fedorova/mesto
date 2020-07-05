import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, popupButtonConfirm) {
    super(popupSelector);
    this._popupButtonConfirm = popupButtonConfirm;
    this._generateHandleSubmit = this._generateHandleSubmit.bind(this);
  }

  _generateHandleSubmit(callback) {
    const that = this;

    return function () {
      callback();
      that.close();
      // console.log('Потом закрыть');
    };
  }

  _setEventListeners(callback) {
    super._setEventListeners();
    this._handleConfirmButton = this._generateHandleSubmit(callback);
    this._popupButtonConfirm.addEventListener('click', this._handleConfirmButton);
  }

  open(callback) {
    //console.log('Сначала открыть');
    this._setEventListeners(callback);
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupButtonConfirm.removeEventListener('click', this._handleConfirmButton);
    super.close();
  }
}

