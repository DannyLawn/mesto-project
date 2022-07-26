class FormValidator {

  constructor(formElement, validationObject) {
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(validationObject.inputSelector));
    this._submitButton = this._formElement.querySelector(validationObject.submitButtonSelector)
    this._inactiveButtonClass = validationObject.inactiveButtonClass;
    this._inputErrorTextClass = validationObject.inputErrorClass;
    this._inputErrorClass = validationObject.errorClass;
  }


  //Показать сообщение ошибки инпута
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorTextClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._inputErrorClass);
  }


  //Скрыть сообщение ошибки инпута
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorTextClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._inputErrorClass);
  }


  //Проверка верности инпута
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }


  //Проверка, есть ли хотя бы один неверный инпут
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }


  //Изменение состояния кнопки submit
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }


  //Добавление обработчиков ввода инпутам
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._formElement.addEventListener('reset', () => {
      this._resetValidation();
    });
  }


  //Сброс валидации
  _resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }


  //Включение проверки форм
  enableValidation() {
      this._setEventListeners(this._formElement);
  }

}



export { FormValidator };