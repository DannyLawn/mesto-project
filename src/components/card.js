class Card {
  constructor(cardData, elementSelectors) {
    this._cardData = cardData;
    this._elementSelectors = elementSelectors;
    // this._deleteCardHandler = deleteCardHandler;
    // this._likeCardHandler = likeCardHandler;
    // this._clickImageHandler = clickImageHandler;
  }

  _getCardElement() {
    this._cardElement = document.querySelector(this._elementSelectors.cardTemplateSelector)
        .content
        .querySelector(this._elementSelectors.cardElementSelector)
        .cloneNode(true);
    return this._cardElement;
  }

  generate() {
    this._element = this._getCardElement();
    this._element.querySelector(this._elementSelectors.cardImageSelector).src = this._cardData.link;
    this._element.querySelector(this._elementSelectors.cardImageSelector).alt = this._cardData.name;
    this._element.querySelector(this._elementSelectors.cardNameSelector).textContent = this._cardData.name;
    return this._element
  }
}

export { Card };

// {deleteCardHandler, likeCardHandler, clickImageHandler}