//Импорт глобальных переменных
import { nameProfile, activityProfile, popupProfile, nameInput, activityInput, popupCard, formCard, inputCardName, inputCardImage } from './data.js';

//Импорт утилитарных функций
import { openPopup, closePopup, resetValidation } from './utils.js';

//Импорт действий с карточками
import { createCard, addCard } from './card.js';



//Открыть редактирование профиля
function openEditProfile() {
  nameInput.value = nameProfile.textContent;
  activityInput.value = activityProfile.textContent;
  resetValidation(popupProfile);
  openPopup(popupProfile);
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
  
  const addedUserCard = {};
  addedUserCard.name = inputCardName.value;
  addedUserCard.link = inputCardImage.value;
  addCard(createCard(addedUserCard));
  closePopup(popupCard);
}


//Сохранение обновлений профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  
  nameProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value;
  closePopup(popupProfile);
}
 


export { openEditProfile, openAddCard, handleAddCardFormSubmit, handleProfileFormSubmit };

