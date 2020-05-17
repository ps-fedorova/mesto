// ОБЪЯВЛЕНИЕ ФУНКЦИЙ

// Показать сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Скрыть сообщение об ошибке
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Проверить валидность поля
const checkInputValidity = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// Проверить все поля ввода на валидность
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся фунцкция hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

// Переключать состояние кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// Установить обработчики всем полям формы
const setEventListeners = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {

  // Найдем в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(submitButtonSelector);

  // чтобы отключить кнопку в самом начале
  toggleButtonState(arrayInputs(formElement), buttonElement, inactiveButtonClass);

  arrayInputs(formElement).forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(arrayInputs(formElement), buttonElement, inactiveButtonClass);
    });
  });
};

// Добавить обработчики всем формам
function enableValidation({ formSelector, ...rest }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(form => setEventListeners(form, rest));
}


// ВЫЗОВ ФУНКЦИЙ

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
});
