//Popup

let popup = document.querySelector('#profile-popup');
let popupClose = popup.querySelector('#profile-toggle');
const formElement = document.querySelector('#edit-profile-form');
const nameInput =  formElement.querySelector('#inpit-name');
const activityInput = popup.querySelector('#input-activity');

popupClose.addEventListener('click', toggleProfilePopUp);

//Profile

let profile = document.querySelector('.profile');
let editProfile = profile.querySelector('.profile__edit-button');
let nameProfile = profile.querySelector('.profile__name');
let activityProfile = profile.querySelector('.profile__activity');

editProfile.addEventListener('click', toggleProfilePopUp);

//Открытие редактирования профиля

function toggleProfilePopUp() {
  popup.classList.toggle('popup_opened'); 
  nameInput.value = nameProfile.textContent;
  activityInput.value = activityProfile.textContent;
}

//Сохранение редактирования профиля
 
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  
  nameProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value;
  popup.classList.remove('popup_opened');
}
 
formElement.addEventListener('submit', formSubmitHandler);
 


//Лайки
let elements = document.querySelector('.elements');
let likes = elements.querySelectorAll('.elements__like-button');

likes.forEach(like => {
  like.addEventListener('click', function(){
  like.classList.toggle('elements__like-button_enabled');
  });
});




//Карточки автозагрузки

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