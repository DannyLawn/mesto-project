//Профиль
const profile = document.querySelector('.profile');
const editProfile = profile.querySelector('.profile__edit-button');
const nameProfile = profile.querySelector('.profile__name');
const activityProfile = profile.querySelector('.profile__activity');
const addCardButton = profile.querySelector('.profile__add-button');


//Попап профиля
const popupProfile = document.querySelector('#profile-popup');
const formProfile = document.forms.editProfile;
const nameInput =  formProfile.elements.profileName;
const activityInput = formProfile.elements.profileAtivity;


//Попап добавления карточек
const popupCard = document.querySelector('#add-card-popup');
const formCard = document.forms.addСardForm;
const inputCardName = formCard.elements.cardName;
const inputCardImage = formCard.elements.cardImageLink;


 //Попап открытой карточки
const openCardPopup = document.querySelector('#open-card');
const openCardImage = openCardPopup.querySelector('.popup__image');
const openCardTitle = openCardPopup.querySelector('.popup__title_type-open-card');


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

  cardElement.querySelector('.elements__like-button').addEventListener('click', enableLike);

  cardElement.querySelector('.elements__delete-button').addEventListener('click', deleteCard);

  cardElement.querySelector('.elements__image').addEventListener('click', () => handleCardClick(object.link, object.name));

  return cardElement;
}


//Активатор лайка
function enableLike(evt) {
  evt.target.classList.toggle('elements__like-button_enabled');
}


//Удаление карточки
function deleteCard(evt) {
  const item = evt.target.closest('.elements__element');
  item.remove();
}


//Открытие карточки
function handleCardClick(image, name) {
  openCardImage.src = image;
  openCardImage.alt = name;
  openCardTitle.textContent = name;
  openPopup(openCardPopup);
}


//Добавление карточки пользователем
function handleAddCardFormSubmit (evt) {
  evt.preventDefault(); 
  
  const addedUserCard = {};
  addedUserCard.name = inputCardName.value;
  addedUserCard.link = inputCardImage.value;
  addCard(createCard(addedUserCard));
  closePopup(popupCard);
}
 
formCard.addEventListener('submit', handleAddCardFormSubmit);


//Загрузка карточек из массива(бд)
initialCards.forEach(card => {
  addCard(createCard(card));
});


//Добавление карточки в контейнер
function addCard (newCard) {
  cardsContainer.prepend(newCard);
}


// Открыть редактирование профиля
function openEditProfile() {
  nameInput.value = nameProfile.textContent;
  activityInput.value = activityProfile.textContent;
  openPopup(popupProfile);
}

editProfile.addEventListener('click', openEditProfile);


//Открыть добавление карточки
function openAddCard() {
  formCard.reset();
  openPopup(popupCard);
}

addCardButton.addEventListener('click', openAddCard);


// Закрыть попапы кнопкой Х
document.querySelectorAll('.popup__toggle').forEach(button => {
  button.addEventListener('click', closeOnX);
});

function closeOnX(evt) {
  closePopup(evt.target.closest('.popup'));
}


// Закрыть попапы клавишей ESC  
document.addEventListener('keydown', closeOnEsc);

function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup !== null) {
    closePopup(openedPopup);
    }
  }
}


// Закрыть попапы кликом на оверлей
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('mousedown', closeOnOverlay);
});

function closeOnOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}