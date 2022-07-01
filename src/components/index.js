import '../pages/index.css';

//Импорт данных
import { editProfile, addCardButton, formProfile, formCard, validationObject, avatarContainer, editAvatarForm, nameProfile, activityProfile, profileAvatar } from './data.js';
 
//Импорт действий с карточками
import { createCard, addCard } from './card.js';

//Импорт действий с модальными окнами
import { openEditProfile, openAddCard, handleAddCardFormSubmit, handleProfileFormSubmit, openEditAvatar, handleAvatarFormSubmit } from './modal.js';

//Импорт валидации форм
import { enableValidation } from './validate.js';

//Импорт api
import { getAllCards, uploadingUserInfo } from './api.js';



// Загрузка профиля с сервера
//     uploadingUserInfo();
//     .then((dataFromServer) => {
//     nameProfile.textContent = dataFromServer.name;
//     activityProfile.textContent = dataFromServer.about;
//     profileAvatar.src = dataFromServer.avatar;
//   })
//   .catch(err => {
//     console.log(`При загрузке профиля: ${err.status}`)
//   });


//Загрузка карточек с сервера
  //    getAllCards();
  //   .then((initialCards) => {
  //   initialCards.reverse().forEach(card => {
  //     addCard(createCard(card));
  //   });
  // })
  // .catch(err => {
  //   console.log(`При загрузке карточек: ${err.status}`)
  // });

  //Загрузка данных пользователя
  function updateUser(data) {
    nameProfile.textContent = data.name;
    activityProfile.textContent = data.about;
    profileAvatar.src = data.avatar;
  }

  

  //Загрузка карточек 
  function updateCards(data) {
    data[1].reverse().forEach(card => {
      addCard(createCard(card));
    });
  }

  //Принимаем данные запроса о пользователе и карточках 
  Promise.all([uploadingUserInfo(), getAllCards()])
    .then(values => {
      updateUser(values[0]);
      updateCards(values);
    })
    .catch(err => {
      console.log(`При загрузке данных: ${err.status}`)
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




  // //Условие отображение кол-ва лайков
  // if (card.likes.length === 0) {
  //   likesCount.style.display = "none";
  // } else {
  //   likesCount.textContent = card.likes.length;
  // }

  // //Условие отображения иконок удаления
  // if (cardOwnerId !== profileId) {
  //   deleteButton.style.display = "none";
  // }

  // Условие активности лайка
  // const result = cardLikes.some(function (profile) {
  //   return profile === profileInfo;
  // });
  // if (cardLikes.some(profileInfo)) {
  //   likeButton.classList.add('elements__like-button_enabled');
  // }