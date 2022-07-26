import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  open(link, name) {
    this._popup.querySelector(this._popupOptions.imageSelector).src = link;
    this._popup.querySelector(this._popupOptions.imageSelector).alt = name;
    this._popup.querySelector(this._popupOptions.captionSelector).textContent =
      name;
    super.open();
  }
}

export { PopupWithImage };
