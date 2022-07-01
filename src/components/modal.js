//Импорт данных
import { nameProfile, activityProfile, popupProfile, nameInput, activityInput, popupCard, formCard, inputCardName, inputCardImage, profileAvatar, editAvatarPopup, editAvatarForm, inputAvatarLink } from './data.js';

//Импорт утилитарных функций
import { openPopup, closePopup, resetValidation, renderLoading } from './utils.js';

//Импорт действий с карточками
import { createCard, addCard } from './card.js';

//Импорт api
import { addNewCard, editProfile, editAvatarProfile } from './api.js';



//Открыть редактирование профиля
function openEditProfile() {
  nameInput.value = nameProfile.textContent;
  activityInput.value = activityProfile.textContent;
  resetValidation(popupProfile);
  openPopup(popupProfile);
}


//Открыть редактирование аватарки
function openEditAvatar() {
  editAvatarForm.reset();
  resetValidation(editAvatarPopup);
  openPopup(editAvatarPopup);
}

//Сохранение измененной аватарки
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submit = editAvatarPopup.querySelector('.popup__input-submit');
  const value = submit.value;
  renderLoading(true, submit);

  editAvatarProfile({avatar: inputAvatarLink.value})
    .then((data) => {
      profileAvatar.src = data.avatar;
      closePopup(editAvatarPopup);
      setTimeout(function(){ 
        submit.value = value;
      }, 1000);
    })
    .catch(err => {
      console.log(`При обновлении аватарки: ${err.status}`)
    })
    .finally(() => {
      renderLoading(false, submit);
    });
}

//Открыть добавление карточки
function openAddCard() {
  formCard.reset();
  resetValidation(popupCard);
  openPopup(popupCard);
}


//Добавление карточки пользователем
function handleAddCardFormSubmit(evt) {
  evt.preventDefault(); 

  const submit = popupCard.querySelector('.popup__input-submit');
  const value = submit.value;
  renderLoading(true, submit);

  addNewCard({name: inputCardName.value, link: inputCardImage.value})
    .then((dataFromServer) => {
      addCard(createCard(dataFromServer));
      closePopup(popupCard);
      setTimeout(function(){ 
        submit.value = value;
      }, 1000);
    })
    .catch(err => {
      console.log(`При добавлении карточки: ${err.status}`)
    })
    .finally(() => {
      renderLoading(false, submit);
    });
 
}


//Сохранение обновлений профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  
  const submit = popupProfile.querySelector('.popup__input-submit');
  const value = submit.value;
  renderLoading(true, submit);


  editProfile({name: nameInput.value, about: activityInput.value})
    .then((dataFromServer) => {
      nameProfile.textContent = dataFromServer.name;
      activityProfile.textContent = dataFromServer.about;
      closePopup(popupProfile);
      setTimeout(function(){ 
        submit.value = value;
      }, 1000);
    })
    .catch(err => {
      console.log(`При сохранении профиля: ${err.status}`)
    })
    .finally(() => {
      renderLoading(false, submit);
    });
}



export { openEditProfile, openAddCard, handleAddCardFormSubmit, handleProfileFormSubmit, openEditAvatar, handleAvatarFormSubmit };

