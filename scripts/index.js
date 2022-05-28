//Профиль
const profile = document.querySelector('.profile');
const editProfile = profile.querySelector('.profile__edit-button');
const nameProfile = profile.querySelector('.profile__name');
const activityProfile = profile.querySelector('.profile__activity');
const addCardButton = profile.querySelector('.profile__add-button');

//Попап профиля
const popupProfile = document.querySelector('#profile-popup');
const closeProfilePopup = popupProfile.querySelector('#profile-toggle');
const formProfile = document.querySelector('#edit-profile-form');
const nameInput =  formProfile.querySelector('#inpit-name');
const activityInput = popupProfile.querySelector('#input-activity');

// Попап добавления карточек
const popupCard = document.querySelector('#add-card-popup');
const formCard = popupCard.querySelector('#add-card-form');
const inputCardName = popupCard.querySelector('#inpit-card-name');
const inputCardImage = popupCard.querySelector('#input-image-link');
const addCardToggle = popupCard.querySelector('#add-card-toggle');

 //Попап открытой карточки
const openCardPopup = document.querySelector('#open-card');
const openCardToggle = openCardPopup.querySelector('#open-card-toggle');
const openCardImage = openCardPopup.querySelector('.popup__image');
const openCardTitle = openCardPopup.querySelector('#open-card-title');

//Контейнер карточек
const cardsContainer = document.querySelector('.elements');


//Обработчики попапов
function openPopup (popup) {
  popup.classList.add('popup_opened');
}  

function closePopup (popup) {
  popup.classList.remove('popup_opened')
}  

//Сохранение обновлений профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  
  nameProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value;
  closePopup(popupProfile);
}
 
formProfile.addEventListener('submit', handleProfileFormSubmit);

//Создание карточки
function createCard (object) {
  const cardTemplate = cardsContainer.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__image').src = object.link;
  cardElement.querySelector('.elements__image').alt = object.name;
  cardElement.querySelector('.elements__element-title').textContent = object.name;

  cardElement.querySelector('.elements__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_enabled');
  });

  cardElement.querySelector('.elements__delete-button').addEventListener('click', function(evt) {
    const item = evt.target.closest('.elements__element');
    item.remove();
  });

  cardElement.querySelector('.elements__image').addEventListener('click', () => handleCardClick(cardElement));

  addCard(cardElement);
}

//Обработка открытия карточки
function handleCardClick(item) {
  openCardImage.src = item.querySelector('.elements__image').src;
  openCardImage.alt = item.querySelector('.elements__element-title').textContent;
  openCardTitle.textContent = item.querySelector('.elements__element-title').textContent;
  openPopup(openCardPopup);
};

//Добавление карточки пользователем
function handleAddCardFormSubmit (evt) {
  evt.preventDefault(); 
  
  const addedUserCard = {};
  addedUserCard.name = inputCardName.value;
  addedUserCard.link = inputCardImage.value;
  createCard(addedUserCard);
  closePopup(popupCard);
}
 
formCard.addEventListener('submit', handleAddCardFormSubmit);

//Загрузка карточек из массива(бд)
initialCards.forEach(card => {
  createCard(card);
});

//Добавление карточки в контейнер
function addCard (newCard) {
  cardsContainer.prepend(newCard);
}

 
// Открыть/закрыть редактирование профиля
editProfile.addEventListener('click', function() {
  nameInput.value = nameProfile.textContent;
  activityInput.value = activityProfile.textContent;
  openPopup(popupProfile);
});

closeProfilePopup.addEventListener('click', function() {
  closePopup(popupProfile);
});

//Открыть/закрыть добавление карточки
addCardButton.addEventListener('click', function() {
  formCard.reset();
  openPopup(popupCard);
});

addCardToggle.addEventListener('click', function() {
  closePopup(popupCard);
});

//Закрытие окна открытой карточки
openCardToggle.addEventListener('click', function() {
  closePopup(openCardPopup);
});