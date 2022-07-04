import '../pages/index.css';

//Импорт данных
import { inputAvatarLink, deleteCardPopup, openCardImage, openCardTitle, openCardPopup, editProfileButton, addCardButton, popupCard, cardsContainer, formProfile, editAvatarPopup, inputCardImage, inputCardName, nameInput, formCard, popupProfile, activityInput, validationObject, avatarContainer, editAvatarForm, nameProfile, activityProfile, profileAvatar } from './data.js';
 
//Импорт действий с карточками
import { createCard, deleteCard, cardElementsOption } from './card.js';

//Импорт общих функций модальных окон
import { openPopup, closePopup, resetValidation, renderLoadingPopup } from './modal.js';

//Импорт валидации форм
import { enableValidation } from './validate.js';

//Импорт api
import { getAllCards, removeCard, uploadingUserInfo, addNewCard, editProfile, editAvatarProfile, likeCard, offLikeCard } from './api.js';



//Загрузка данных пользователя
function updateUser(data) {
  nameProfile.textContent = data.name;
  activityProfile.textContent = data.about;
  profileAvatar.src = data.avatar;
}


//Загрузка карточек 
function updateCards(cardData, userId) {
  cardData.reverse().forEach(card => {
    const cardElement = createCard(card);
    cardElementsOption(card, userId, cardElement);    
    addCard(cardElement);
  });
}


//Принимаю данные от сервера о пользователе и карточках 
Promise.all([uploadingUserInfo(), getAllCards()])
  .then(values => {
    const userId = values[0]._id;
    updateUser(values[0]);
    updateCards(values[1], userId);
  })
  .catch(err => {
    console.log(`При загрузке данных: ${err.status}`)
  });


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


  renderLoadingPopup(editAvatarPopup, true);

  editAvatarProfile({avatar: inputAvatarLink.value})
    .then((data) => {
      profileAvatar.src = data.avatar;
      closePopup(editAvatarPopup);
    })
    .catch(err => {
      console.log(`При обновлении аватарки: ${err.status}`)
    })
    .finally(() => {
      renderLoadingPopup(editAvatarPopup, false);
    });
}


//Открыть добавление карточки
function openAddCard() {
  formCard.reset();
  resetValidation(popupCard);
  openPopup(popupCard);
}


//Сохранение добавленной карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault(); 


  renderLoadingPopup(popupCard, true);

  addNewCard({name: inputCardName.value, link: inputCardImage.value})
    .then((dataFromServer) => {
      addCard(createCard(dataFromServer));
      closePopup(popupCard);
    })
    .catch(err => {
      console.log(`При добавлении карточки: ${err.status}`)
    })
    .finally(() => {
      renderLoadingPopup(popupCard, false);
    });
 
}


//Сохранение обновлений профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 

  renderLoadingPopup(popupProfile, true);

  editProfile({name: nameInput.value, about: activityInput.value})
    .then((dataFromServer) => {
      nameProfile.textContent = dataFromServer.name;
      activityProfile.textContent = dataFromServer.about;
      closePopup(popupProfile);
    })
    .catch(err => {
      console.log(`При сохранении профиля: ${err.status}`)
    })
    .finally(() => {
      renderLoadingPopup(popupProfile, false);
    });
}

 
//Открытие карточки
function handleCardClick(image, name) {
  openCardImage.src = image;
  openCardImage.alt = name;
  openCardTitle.textContent = name;
  openPopup(openCardPopup);
}


//Удаление карточки
function handleDeleteCard(cardElement, cardId) {
  const handleRemoveCardSubmit = (evt) => {
    evt.preventDefault();

    removeCard(cardId)
      .then(() => {
        deleteCard(cardElement); 
        closePopup(deleteCardPopup); 
      })
      .catch(err => {
        console.log(`При удалении карточки: ${err.status}`)
      });
    deleteCardPopup.removeEventListener('submit', handleRemoveCardSubmit);
  }
  deleteCardPopup.addEventListener('submit', handleRemoveCardSubmit);

  openPopup(deleteCardPopup);
}


//Переключатель лайка
function toggleLike(cardId, likesCount, evt) {
  if (!evt.target.classList.contains("elements__like-button_enabled")) {
    likeCard(cardId)
      .then(data => {
        evt.target.classList.add("elements__like-button_enabled");
        likesCount.textContent = data.likes.length;
        if (data.likes.length === 0) {
          likesCount.style.display = "none";
        } else {
          likesCount.style.display = "block";
        }
      })
      .catch(err => console.log(err.status))
  } else {
    offLikeCard(cardId)
    .then(data => {
      evt.target.classList.remove("elements__like-button_enabled");
      likesCount.textContent = data.likes.length;
      if (data.likes.length === 0) {
        likesCount.style.display = "none";
      } else {
        likesCount.style.display = "block";
      }
    })
    .catch(err => console.log(err.status))
  }  
}


//Добавление карточки в контейнер
function addCard(newCard) {
  cardsContainer.prepend(newCard);
}


//Обработчик открытия добавления новой карточки
addCardButton.addEventListener('click', openAddCard);

//Обработчик сохранения добавленной пользователем карточки
formCard.addEventListener('submit', handleAddCardFormSubmit);

//Обработчик открытия редактирования профиля
editProfileButton.addEventListener('click', openEditProfile);

//Обработчик сохранения изменений профиля
formProfile.addEventListener('submit', handleProfileFormSubmit);

//Обработчик открытия редактирования аватарки
avatarContainer.addEventListener('click', openEditAvatar);

//Обработчик сохранения измененной аватарки
editAvatarForm.addEventListener('submit', handleAvatarFormSubmit);

//Включение валидации
enableValidation(validationObject);



export { addCard, handleCardClick, handleDeleteCard, toggleLike };