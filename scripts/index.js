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


//Обработчики открытия/закрытия попапов
function openPopup(popup) {
  const formElement = popup.querySelector('.popup__edit-form');
  if (formElement !== null) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input-text'));
    const buttonElement = formElement.querySelector('.popup__input-submit');
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement);
    });
    toggleButtonState(inputList, buttonElement);
  }
  document.addEventListener('keydown', closeOnEsc);
  popup.addEventListener('mousedown', closeOnOverlay);
  popup.querySelector('.popup__toggle').addEventListener('click', closeOnX);
  popup.classList.add('popup_opened');
}  

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}  


// Закрытие кнопкой Х
function closeOnX(evt) {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
  popup.querySelector('.popup__toggle').removeEventListener('click', closeOnX);
}


// Закрытие клавишей ESC  
function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
    document.removeEventListener('keydown', closeOnEsc);
  }
}


// Закрытие кликом на оверлей
function closeOnOverlay(evt) {
  closePopup(evt.target);
  evt.target.removeEventListener('mousedown', closeOnOverlay);
}


//Сохранение обновлений профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  
  nameProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value;
  closePopup(popupProfile);
}
 
formProfile.addEventListener('submit', handleProfileFormSubmit);


//Создание карточки
function createCard(object) {
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
function handleAddCardFormSubmit(evt) {
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
function addCard(newCard) {
  cardsContainer.prepend(newCard);
}


//Открыть редактирование профиля
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


// - - - - Валидация форм - - - - 

//Показать сообщение ошибки инпута
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input-text_type-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}

//Скрыть сообщение ошибки инпута
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input-text_type-error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
}

//Проверка верности инпута
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

//Проверка, есть ли хотя бы один неверный инпут
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Изменение состояния кнопки submit
function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__input-submit_inactive');
  } else {
    buttonElement.classList.remove('popup__input-submit_inactive');
  }
}

//Добавление обработчиков ввода инпутам
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-text'));
  const buttonElement = formElement.querySelector('.popup__input-submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

//Включение проверки форм
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__edit-form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation();