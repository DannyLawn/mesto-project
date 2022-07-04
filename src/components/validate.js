//Показать сообщение ошибки инпута
function showInputError(formElement, inputElement, errorMessage, validObj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validObj.errorClass);
}


//Скрыть сообщение ошибки инпута
function hideInputError(formElement, inputElement, validObj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validObj.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(validObj.errorClass);
}


//Проверка верности инпута
function checkInputValidity(formElement, inputElement, validObj) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validObj);
  } else {
    hideInputError(formElement, inputElement, validObj);
  }
}


//Проверка, есть ли хотя бы один неверный инпут
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}


//Изменение состояния кнопки submit
function toggleButtonState(inputList, buttonElement, validObj) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(validObj.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validObj.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}


//Добавление обработчиков ввода инпутам
function setEventListeners(formElement, validObj) {
  const inputList = Array.from(formElement.querySelectorAll(`.${validObj.inputSelector}`));
  const buttonElement = formElement.querySelector(`.${validObj.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, validObj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, validObj);
      toggleButtonState(inputList, buttonElement, validObj);
    });
  });
}


//Включение проверки форм
function enableValidation(validObj) {
  const formList = Array.from(document.querySelectorAll(`.${validObj.formSelector}`));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validObj);
  });
}



export { showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation };