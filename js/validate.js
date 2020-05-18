// ОБЪЯВЛЕНИЕ ФУНКЦИЙ

// Показать сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

// Скрыть сообщение об ошибке
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Проверить валидность поля
const checkInputValidity = (formElement, inputElement, popupParameters) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, popupParameters.inputErrorClass, popupParameters.errorClass);
  } else {
    hideInputError(formElement, inputElement, popupParameters.inputErrorClass, popupParameters.errorClass);
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
const setEventListeners = (formElement, popupParameters) => {

  // Найдем в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(popupParameters.submitButtonSelector);

  // чтобы отключить кнопку в самом начале
  toggleButtonState(arrayInputs(formElement), buttonElement, popupParameters.inactiveButtonClass);

  arrayInputs(formElement).forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, popupParameters);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(arrayInputs(formElement), buttonElement, popupParameters.inactiveButtonClass);
    });
  });
};


// Добавить обработчики всем формам
function enableValidation(popupParameters) {
  const formList = Array.from(document.querySelectorAll(popupParameters.formSelector));
  formList.forEach(form => setEventListeners(form, popupParameters));
}


// ВЫЗОВ ФУНКЦИЙ

enableValidation(popupParameters);

