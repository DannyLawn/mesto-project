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
  closeButtonClass: 'popup__toggle',
  imageSelector: '.popup__image',
  captionSelector: '.popup__title',
  openedPopupClass: 'popup_opened'
}

const typesOfPopups = {
  editProfilePopup: '#profile-popup',
  editAvatarPopup: '#edit-avatar-popup',
  createCardPopup: '#add-card-popup',
  openCardPopup: '#open-card',
  deleteCardPopup: '#delete-card-popup'
}

const buttons = {
  profileOpenButton: document.querySelector('.profile__edit-button'),
  placeOpenButton: document.querySelector('.profile__add-button'),
  avatarOpenButton: document.querySelector('.profile__avatar-container')
}

export { config, cardsContainer, userInfoSelectors, cardSelectors, typesOfPopups, popupOptions, buttons };