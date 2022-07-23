class Card {
  constructor({cardData, cardSelectors, deleteCardHandler, likeCardHandler, clickImageHandler}) {
    this._cardData = cardData;
    this._elementSelectors = cardSelectors;
    this._deleteCardHandler = deleteCardHandler;
    this._likeCardHandler = likeCardHandler;
    this._clickImageHandler = clickImageHandler;
    this._likesArr = cardData.likes;
  }

  _getCardElement() {
    this._cardElement = document.querySelector(this._elementSelectors.cardTemplateSelector)
        .content
        .querySelector(this._elementSelectors.cardElementSelector)
        .cloneNode(true);
    return this._cardElement;
  }

  _setEventListeners() {
    this._element.querySelector(this._elementSelectors.deleteButtonSelector).addEventListener('click', this._deleteCardHandler);
    this._element.querySelector(this._elementSelectors.likeButtonSelector).addEventListener('click', this._likeCardHandler);
    this._element.querySelector(this._elementSelectors.cardImageSelector).addEventListener('click', this._clickImageHandler);
  }

  _hideDeleteButton(userId) {
    if (this._cardData._id !== userId) {
      this._element.querySelector(this._elementSelectors.deleteButtonSelector).style.display = "none";
    }    
  }

  _setLikeCounter(likesArr) {
    this._element.querySelector(this._elementSelectors.likesCountSelector).textContent = likesArr.length;
  }

  generate(userId) {
    this._element = this._getCardElement();
    this._setEventListeners();
    this._hideDeleteButton(userId);
    this._setLikeCounter(this._likesArr);
    this._element.querySelector(this._elementSelectors.cardImageSelector).src = this._cardData.link;
    this._element.querySelector(this._elementSelectors.cardImageSelector).alt = this._cardData.name;
    this._element.querySelector(this._elementSelectors.cardNameSelector).textContent = this._cardData.name;
    return this._element;
  }

  

}

export { Card };

// {deleteCardHandler, likeCardHandler, clickImageHandler}