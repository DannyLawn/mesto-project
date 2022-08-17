class FormValidator {
  constructor(formElement, validationObject) {
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(validationObject.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      validationObject.submitButtonSelector
    );
    this._inactiveButtonClass = validationObject.inactiveButtonClass;
    this._inputErrorTextClass = validationObject.inputErrorClass;
    this._inputErrorClass = validationObject.errorClass;
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorTextClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorTextClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._disableButton();
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._formElement.addEventListener("reset", () => {
      this._resetValidation();
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator };
