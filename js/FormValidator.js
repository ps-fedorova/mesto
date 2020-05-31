export class FormValidator {
  constructor(parameters, formElement) {
    this._formSelector = parameters.formSelector;
    this._inputSelector = parameters.inputSelector;
    this._submitButtonSelector = parameters.submitButtonSelector;
    this._inactiveButtonClass = parameters.inactiveButtonClass;
    this._inputErrorClass = parameters.inputErrorClass;
    this._errorClass = parameters.errorClass;
    this._formElement = formElement;
  }

  // Показать сообщение об ошибке
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  // Скрыть сообщение об ошибке
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Проверить валидность поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Убрать ошибку, если пользователь закрыл попап и при этом ввел невалидные данные
  clearError() {
    Array.from(this._formElement.querySelectorAll('.popup__input')).forEach(inputElement => this._hideInputError(inputElement));
  }

  /*Это второй публичный метод. Избавляет от дублирования кода.
  Был вариант его оформлить как _clearError() и смастерить вот такую конструкцию в конце:

  enableValidation() {
    this._setEventListeners();
    this._clearError();
  }

Но! нужно будет вызывать .enableValidation при каждом открытии формы - тогда будет навешиваться лишний обработчик. Его будет нужно как-то удалять,
чтобы избежать утечки памяти. Исходя из этого я позволила себе сделать 2 публичных метода. Я могу ошибаться в этом решении. Не знаю, как лучше.
Я вообще плохо пока понимаю про утечку памяти. Буду благодарна, если этот момент вы проверите более тщательно.
Надеюсь, сообщение не будет трактоваться как просьба о помощи, я хотела просто пояснить свое решение.
  )*/


  // Проверить все поля ввода на валидность
  _hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся фунцкция hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  }

  // Переключать состояние кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  // Установить обработчики всем полям формы
  _setEventListeners() {
    const formList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector); // найдем в текущей форме кнопку отправки

    this._toggleButtonState(formList, buttonElement); // чтобы отключить кнопку в самом начале

    formList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(formList, buttonElement); // чтобы проверять его при изменении любого из полей
      });
    });
  }

  // Добавить обработчики всем формам
  enableValidation() {
    this._setEventListeners();
  }
}
