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



//Загрузка данных пользователя
function updateUser(data) {
  nameProfile.textContent = data.name;
  activityProfile.textContent = data.about;
  profileAvatar.src = data.avatar;
}


//Загрузка карточек 
function updateCards(data) {
  data[1].reverse().forEach(card => {
    const cardElement = createCard(card);
    const likesCount = cardElement.querySelector('.elements__like-count');
    const deleteButton = cardElement.querySelector('.elements__delete-button');
    const likeButton =  cardElement.querySelector('.elements__like-button');

    //Условие отображение кол-ва лайков
    if (card.likes.length === 0) {
      likesCount.style.display = "none";
    } else {
      likesCount.textContent = card.likes.length;
    }

    //Условие отображения иконок удаления при загрузке
    if (card.owner._id !== data[0]._id) {
      deleteButton.style.display = "none";
    }
        
    //Условие активности лайка при загрузке
    card.likes.forEach((profile) => {
      if (profile._id === data[0]._id) {
        likeButton.classList.add('elements__like-button_enabled');
      }
    })
        
    addCard(cardElement);
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