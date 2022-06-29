import '../pages/index.css';

//Импорт глобальных переменных
import { editProfile, addCardButton, formProfile, formCard, validationObject, avatarContainer, editAvatarForm } from './data.js';
 
//Импорт действий с карточками
import { initialCards, createCard, addCard } from './card.js';

//Импорт действий с модальными окнами
import { openEditProfile, openAddCard, handleAddCardFormSubmit, handleProfileFormSubmit, openEditAvatar, handleAvatarFormSubmit } from './modal.js';

//Импорт валидации форм
import { enableValidation } from './validate.js';


//Загрузка карточек из массива
initialCards.forEach(card => {
  addCard(createCard(card));
});

//Обработчик открытия добавления новой карточки
addCardButton.addEventListener('click', openAddCard);

//Обработчик сохранения добавленной пользователем карточки
formCard.addEventListener('submit', handleAddCardFormSubmit);

//Обработчик открытия редактирования профиля
editProfile.addEventListener('click', openEditProfile);

//Обработчик сохранения изменений профиля
formProfile.addEventListener('submit', handleProfileFormSubmit);

//Обработчик открытия редактирования аватарки
avatarContainer.addEventListener('click', openEditAvatar);

//Обработчик сохранения измененной аватарки
editAvatarForm.addEventListener('submit', handleAvatarFormSubmit);

//Включение валидации
enableValidation(validationObject);