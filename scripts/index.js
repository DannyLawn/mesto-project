//Импорт глобальных переменных
import { editProfile, addCardButton, formProfile, formCard, validationObject } from './data.js';
 
//Импорт действий с карточками
import { initialCards, createCard, addCard } from './card.js';

//Импорт действий с модальными окнами
import { openEditProfile, openAddCard, handleAddCardFormSubmit, handleProfileFormSubmit } from './modal.js';

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

//Включение валидации
enableValidation(validationObject);