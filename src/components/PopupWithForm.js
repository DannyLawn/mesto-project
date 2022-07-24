import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, popupOptions, submitCallback) {
  super(popupSelector, popupOptions);
  this._submitCallback = submitCallback;
  this._form = this._popup.querySelector(popupOptions.formSelector);
  this._inputList = this._popup.querySelectorAll(popupOptions.inputSelector);
  this._submitButton = this._popup.querySelectorAll(popupOptions.submitButtonSelector);
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;
  }

  _submit = (evt) => {
    evt.preventDefault();
    this._submitCallback(this._getInputValues())
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._submit);
  }

  close() {
    super.close();
    this._form.reset();
  }

  toggleSavingStatus() {
    this._submitButton.textContent === "Сохранить"
      ? (this._submitButton.value = "Сохранение...")
      : (this._submitButton.value = "Сохранить")
  }
}

export { PopupWithForm}