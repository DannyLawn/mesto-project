//Импорт api
import { uploadingUserInfo } from './api.js';

//Профиль
const profile = document.querySelector('.profile');
const editProfile = profile.querySelector('.profile__edit-button');
const nameProfile = profile.querySelector('.profile__name');
const activityProfile = profile.querySelector('.profile__activity');
const addCardButton = profile.querySelector('.profile__add-button');
const avatarContainer = profile.querySelector('.profile__avatar-container');
const profileAvatar = profile.querySelector('.profile__avatar');


//Попап профиля
const popupProfile = document.querySelector('#profile-popup');
const formProfile = document.forms.editProfile;
const nameInput =  formProfile.elements.profileName;
const activityInput = formProfile.elements.profileAtivity;

//Попап аватарки
const editAvatarPopup = document.querySelector('#edit-avatar-popup');
const editAvatarForm = document.forms.editAvatarForm;
const inputAvatarLink =  editAvatarForm.elements.avatarImageLink;

//Попап добавления карточек
const popupCard = document.querySelector('#add-card-popup');
const formCard = document.forms.addСardForm;
const inputCardName = formCard.elements.cardName;
const inputCardImage = formCard.elements.cardImageLink;

//Попап открытой карточки
const openCardPopup = document.querySelector('#open-card');
const openCardImage = openCardPopup.querySelector('.popup__image');
const openCardTitle = openCardPopup.querySelector('.popup__title_type-open-card');

//Попап удаления карточки
const deleteCardPopup = document.querySelector('#delete-card-popup');
const formDeleteCard = document.forms.deleteСardForm;

//Контейнер карточек
const cardsContainer = document.querySelector('.elements');

//Объект валидации 
const validationObject = {
  formSelector: 'popup__form',
  inputSelector: 'popup__input-text',
  submitButtonSelector: 'popup__input-submit',
  inactiveButtonClass: 'popup__input-submit_inactive',
  inputErrorClass: 'popup__input-text_type-error',
  errorClass: 'popup__input-error_active'
};

//Все попапы страницы
const popups = document.querySelectorAll('.popup');



export { profile, editProfile, nameProfile, activityProfile, addCardButton, popupProfile, formProfile, nameInput, activityInput, popupCard, formCard, inputCardName, inputCardImage, openCardPopup, openCardImage, openCardTitle, cardsContainer, validationObject, popups, deleteCardPopup, formDeleteCard, avatarContainer, profileAvatar, editAvatarPopup, editAvatarForm, inputAvatarLink };