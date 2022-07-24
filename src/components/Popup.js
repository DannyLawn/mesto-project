class Popup {
  constructor(popupSelector, popupOptions) {
    this._popup = document.querySelector(popupSelector);
    this._popupOptions = popupOptions;
  }

  open() {
    this._popup.classList.add(this._popupOptions.openedPopupClass);
    this._setEventListeners();
  }

  _close() {
    this._popup.classList.remove(this._popupOptions.openedPopupClass);
    this._removeEventListeners();
  }

  _handlePressEsc = (evt) => {
    if (evt.key === 'Escape') {
      this._close();
    }
  }

  _handlePressClick = (evt) => {
    if (evt.target.classList.contains(this._popupOptions.openedPopupClass) ||
        evt.target.classList.contains(this._popupOptions.closeButtonClass)) {
        this._close();
        }
  }

  _setEventListeners() {
    this._popup.addEventListener('mousedown', this._handlePressClick);
    document.addEventListener('keydown', this._handlePressEsc);
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._handlePressEsc);
    this._popup.removeEventListener('mousedown', this._handlePressClick);
  }
}


export { Popup };
