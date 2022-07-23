class Popup {
  constructor(popupSelector, popupOptions) {
    this._popup = document.querySelector(popupSelector);
    this._popupOptions = popupOptions;
  }

  open() {
    this._popup.classList.add(this._popupOptions.openedPopupClass);
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove(this._popupOptions.openedPopupClass);
    this._removeEventListeners()
  }

  _handlePressEsc(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _handlePressClick(evt) {
    if (evt.target.classList.content(popupOptions.openedPopupClass) ||
        evt.target.classList.content(popupOptions.closeButtonSelector)
  ) {
    this.close()
    }
  }

  _setEventListeners() {

  }

  _removeEventListeners() {

  }
}
