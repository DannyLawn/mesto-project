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

const cardElementSelectors = {
  cardTemplateSelector: '.card-template',
  cardElementSelector: '.elements__element',
  cardImageSelector: '.elements__image',
  cardNameSelector: '.elements__element-title',
  deleteButtonSelector: '.elements__delete-button',
  likeButtonSelector:  '.elements__like-button',
  likesCountColector: '.elements__like-count',
  likeButtonActiveClass: 'elements__like-button_enabled',
  deleteButtonActiveClass: 'elements__delete-button_enabled'
}

export { config, cardsContainer, userInfoSelectors, cardElementSelectors };