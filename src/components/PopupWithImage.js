import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector, popupOptions) {
    super(popupSelector, popupOptions);
    this._image = this._popup.querySelector(this._popupOptions.imageSelector);
    this._caption = this._popup.querySelector(this._popupOptions.captionSelector);
  }
  open(link, name) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}

export { PopupWithImage };
