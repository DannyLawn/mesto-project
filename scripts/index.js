//Модалка редактирования профиля
const popupProfile = document.querySelector('#profile-popup');
const popupProfileClose = popupProfile.querySelector('#profile-toggle');
const formProfile = document.querySelector('#edit-profile-form');
const nameInput =  formProfile.querySelector('#inpit-name');
const activityInput = popupProfile.querySelector('#input-activity');


//Профиль
const profile = document.querySelector('.profile');
const editProfile = profile.querySelector('.profile__edit-button');
const nameProfile = profile.querySelector('.profile__name');
const activityProfile = profile.querySelector('.profile__activity');
const addCardButton = profile.querySelector('.profile__add-button');


//Плавное отображение закрытия/открытия попапа профиля
function smoothProfileModal() {
  if (popupProfile.classList.contains('popup_opened') ) {
    popupProfile.style.transition = 'opacity 0.7s, visibility 0s 0.7s';
  } else {
    popupProfile.style.transition = 'visibility 0s, opacity 0.7s';
  }
}


//Открытие и закрытие редактирования профиля
editProfile.addEventListener('click', toggleProfilePopUp);

function toggleProfilePopUp() {
  smoothProfileModal();
  popupProfile.classList.toggle('popup_opened'); 
  nameInput.value = nameProfile.textContent;
  activityInput.value = activityProfile.textContent;
}


//Закрытие редактирования, без сохранения
popupProfileClose.addEventListener('click', toggleProfilePopUp);


//Сохранение обновлений профиля
function formSubmitProfile (evt) {
  evt.preventDefault(); 
  
  nameProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value;
  smoothProfileModal();
  popupProfile.classList.remove('popup_opened');
}
 
formProfile.addEventListener('submit', formSubmitProfile);
 

//Модалка добавления карточек
const popupCard = document.querySelector('#add-card-popup');
const formCard = popupCard.querySelector('#add-card-form');
const inputCardName = popupCard.querySelector('#inpit-card-name');
const inputCardImage = popupCard.querySelector('#input-image-link');
const addCardToggle = popupCard.querySelector('#add-card-toggle');


//Плавное отображение закрытия/открытия попапа карточек
function smoothCardModal() {
  if (popupCard.classList.contains('popup_opened') ) {
    popupCard.style.transition = 'opacity 0.7s, visibility 0s 0.7s';
  } else {
    popupCard.style.transition = 'visibility 0s, opacity 0.7s';
  }
}


//Открытие модалки добавления карточек
addCardButton.addEventListener('click', toggleAddCardPopUp);

function toggleAddCardPopUp() {
  inputCardName.value = '';
  inputCardImage.value = '';
  smoothCardModal();
  popupCard.classList.toggle('popup_opened');
}


//Отмена добавления карточек
addCardToggle.addEventListener('click', toggleAddCardPopUp);


//Обработка лайков карточек, добавленных в html-разметку 
const cardsContainer = document.querySelector('.elements');

let likesOfAddedCards = cardsContainer.querySelectorAll('.elements__like-button');
likesOfAddedCards.forEach(likeOfAddedCard => {
  
  likeOfAddedCard.addEventListener('click', function(){
    likeOfAddedCard.classList.toggle('elements__like-button_enabled');
  });
});


//Обработка удалений карточек, добавленных в html-разметку
let addedCards = cardsContainer.querySelectorAll('.elements__element');
addedCards.forEach(addedCard => {
  const deleteButton = addedCard.querySelector('.elements__delete-button');
  deleteButton.addEventListener('click', function() {
    addedCard.remove();
  });
  
});


//Автозагрузка массива карточек
const initialCards = [
  {
    name: 'Кучерла',
    link: 'https://images.unsplash.com/photo-1615128216846-99c52541bf92?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470'
  },
  {
    name: 'Москва-Сити',
    link: 'https://images.unsplash.com/photo-1613059093860-582e53c584c3?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1552588355-23e1b81409cd?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=389'
  },
  {
    name: 'Петергоф',
    link: 'https://images.unsplash.com/photo-1610197361600-33a3a5073cad?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1555460285-041a4924bba6?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1612257460705-e0d24b7a4808?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387'
  }
  ];

initialCards.forEach(card => {
  addCards(card);
});


//Функция добавления карточек, с элементом удаления
function addCards (object) {
  let cardTemplate = cardsContainer.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__image').src = object.link;
  cardElement.querySelector('.elements__element-title').textContent = object.name;

  cardElement.querySelector('.elements__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_enabled');
  });

  cardElement.querySelector('.elements__delete-button').addEventListener('click', function(evt) {
    evt.target.parentElement.remove();
  });
  
  cardsContainer.prepend(cardElement);
  openCards();
  popupCard.classList.remove('popup_opened');
}


//Обработка и формирование объекта-карточки, добавленной пользователем
function formSubmitCard (evt) {
  evt.preventDefault(); 
  
  const addedUserCard = {};
  addedUserCard.name = inputCardName.value;
  addedUserCard.link = inputCardImage.value;
  addCards(addedUserCard);
}
 
formCard.addEventListener('submit', formSubmitCard);


//Модалка открытия карточки
const openCardPopup = document.querySelector('#open-card');
const openCardToggle = openCardPopup.querySelector('#open-card-toggle');
const openCardImage = openCardPopup.querySelector('.popup__image');
const openCardTitle = openCardPopup.querySelector('#open-card-title');


//Открытие карточки
function openCards() {
  let ImagesCards = document.querySelectorAll('.elements__image');
  ImagesCards.forEach(image => {
    image.addEventListener('click', function(evt) {
      openCardImage.src = evt.target.src;
      openCardTitle.textContent = evt.target.parentElement.querySelector('.elements__element-title').textContent;
      smoothImageModal();
      openCardPopup.classList.add('popup_opened');
    });
  }); 
}
openCards();


//Закрытие карточки
openCardToggle.addEventListener('click', function() {
  smoothImageModal();
  openCardPopup.classList.remove('popup_opened');
});


//Плавное отображение закрытия/открытия попапа-картинки
function smoothImageModal() {
  if (openCardPopup.classList.contains('popup_opened') ) {
    openCardPopup.style.transition = 'opacity 0.7s, visibility 0s 0.7s';
  } else {
    openCardPopup.style.transition = 'visibility 0s, opacity 0.7s';
  }
}

