class Card {
  constructor({
    cardData,
    cardSelectors,
    deleteCardHandler,
    likeCardHandler,
    clickImageHandler,
  }) {
    this._cardData = cardData;
    this._elementSelectors = cardSelectors;
    this._deleteCardHandler = deleteCardHandler;
    this._likeCardHandler = likeCardHandler;
    this._clickImageHandler = clickImageHandler;
    this._likesArr = cardData.likes;
    this.id = cardData._id;
  }

  _getCardElement() {
    this._cardElement = document
      .querySelector(this._elementSelectors.cardTemplateSelector)
      .content.querySelector(this._elementSelectors.cardElementSelector)
      .cloneNode(true);
    return this._cardElement;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", this._deleteCardHandler);
    this._likeButton.addEventListener("click", this._likeCardHandler);
    this._image.addEventListener("click", this._clickImageHandler);
  }

  _hideDeleteButton(userId) {
    if (this._cardData.owner._id !== userId) {
      this._deleteButton.style.display = "none";
    }
  }

  _setLikeCounter(likesArr) {
    this._likeCounter.textContent = likesArr.length;
  }

  _setLikeState(userId) {
    if (this._cardData.likes.some((likeOwner) => likeOwner._id === userId)) {
      this._likeButton.classList.add(
        this._elementSelectors.likeButtonActiveClass
      );
      this.isLiked = true;
    } else {
      this.isLiked = false;
    }
  }

  toggleLikeModifier(likesArr) {
    if (!this.isLiked) {
      this._likeButton.classList.add(
        this._elementSelectors.likeButtonActiveClass
      );
      this.isLiked = true;
    } else {
      this._likeButton.classList.remove(
        this._elementSelectors.likeButtonActiveClass
      );
      this.isLiked = false;
    }
    this._setLikeCounter(likesArr);
  }

  generate(userId) {
    this._element = this._getCardElement();
    this._deleteButton = this._element.querySelector(
      this._elementSelectors.deleteButtonSelector
    );
    this._likeButton = this._element.querySelector(
      this._elementSelectors.likeButtonSelector
    );
    this._image = this._element.querySelector(
      this._elementSelectors.cardImageSelector
    );
    this._likeCounter = this._element.querySelector(
      this._elementSelectors.likesCountSelector
    );
    this._setEventListeners();
    this._hideDeleteButton(userId);
    this._setLikeCounter(this._likesArr);
    this._setLikeState(userId);
    this._image.src = this._cardData.link;
    this._image.alt = this._cardData.name;
    this._element.querySelector(
      this._elementSelectors.cardNameSelector
    ).textContent = this._cardData.name;
    return this._element;
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}

export { Card };
