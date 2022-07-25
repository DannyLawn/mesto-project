import { Popup } from "./Popup";

class popupWithConfirmation extends Popup {
  constructor(popupSelector, popupOptions, submitCallback) {
    super(popupSelector, popupOptions);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(popupOptions.formSelector);
    this._submitButton = this._popup.querySelector(popupOptions.submitButtonSelector);
    this._defaultSubmitValue = this._submitButton.value;
    }
  
    _submit = (evt) => {
      evt.preventDefault();
      this._submitCallback();
    }
  
    _setEventListeners() {
      super._setEventListeners();
      this._form.addEventListener('submit', this._submit);
    }
  
    toggleSavingStatus() {
        this._submitButton.value === this._defaultSubmitValue 
        ? this._submitButton.value = "Удаление..."
        : this._submitButton.value = this._defaultSubmitValue;
    }
  }

export { popupWithConfirmation }
