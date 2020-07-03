import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupButton = popupSelector.querySelector('.popup__button');

    this._generateHandleSubmit = this._generateHandleSubmit.bind(this);
  }

  _getInputValues() {
    this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  _renderLoading(isLoading, text) {
    if (isLoading) {
      this._popupButton.textContent = `${text}...`;
    } else {
      this._popupButton.textContent = text;
    }
  }

  _generateHandleSubmit() {
    const that = this; //(https://habr.com/ru/post/421959/) - для себя оставила, чтобы не потерять
    const thisText = this._popupButton.textContent; // без этого теряется ссылка на контекст

    return function (evt) {
      evt.preventDefault();
      that._renderLoading(true, thisText);
      that._handleFormSubmit(that._getInputValues())
        .then(() => {
          that.close();
          evt.target.reset();
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => that._renderLoading(false, thisText))
    }
  }

  _setEventListeners() {
    super._setEventListeners();
    this._HandleSubmitButton = this._generateHandleSubmit();
    this._popupSelector.addEventListener('submit', this._HandleSubmitButton);
  }

  open() {
    this._setEventListeners(this._handleFormSubmit);
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.removeEventListener('submit', this._HandleSubmitButton);
    super.close();
  }
}
