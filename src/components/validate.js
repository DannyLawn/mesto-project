import { validationObject } from './data.js';



//Сброс валидации
function resetValidation(popup) {
  const formElement = popup.querySelector(`.${validationObject.formSelector}`);
  const inputList = Array.from(formElement.querySelectorAll(`.${validationObject.inputSelector}`));
  const buttonElement = formElement.querySelector(`.${validationObject.submitButtonSelector}`);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
  toggleButtonState(inputList, buttonElement);
}


//Показать сообщение ошибки инпута
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationObject.errorClass);
}


//Скрыть сообщение ошибки инпута
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationObject.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(validationObject.errorClass);
}


//Проверка верности инпута
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}


//Проверка, есть ли хотя бы один неверный инпут
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}


//Изменение состояния кнопки submit
function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationObject.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationObject.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}


//Добавление обработчиков ввода инпутам
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(`.${validationObject.inputSelector}`));
  const buttonElement = formElement.querySelector(`.${validationObject.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}


//Включение проверки форм
function enableValidation() {
  const formList = Array.from(document.querySelectorAll(`.${validationObject.formSelector}`));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}



export { showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation, resetValidation };