const config = {
  url: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
    "Content-type": "application/json",
    "Authorization": "04094868-01f7-4148-b349-0bbb01e31812"
  }
}

const cardsContainer = '.elements';

const userInfoSelectors = {
  nameSelector: '.profile__name',
  activitySelector: '.profile__activity',
  avatarSelector: '.profile__avatar'
}

const cardSelectors = {
  cardTemplateSelector: '.card-template',
  cardElementSelector: '.elements__element',
  cardImageSelector: '.elements__image',
  cardNameSelector: '.elements__element-title',
  deleteButtonSelector: '.elements__delete-button',
  likeButtonSelector:  '.elements__like-button',
  likesCountSelector: '.elements__like-count',
  likeButtonActiveClass: 'elements__like-button_enabled'
}

const popupOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__input-submit',
  closeButtonSelector: '.popup__toggle',
  imageSelector: '.popup__image',
  captionSelector: '.popup__title',
  openedPopupClass: 'popup_opened'
}

export { config, cardsContainer, userInfoSelectors, cardSelectors };