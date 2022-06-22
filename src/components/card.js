//Импорт глобальных переменных
import { openCardPopup, openCardImage, openCardTitle, cardsContainer } from './data.js';

//Импорт утилитарных функций
import { openPopup } from './utils.js';



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
  
//Добавление карточки в контейнер
function addCard(newCard) {
  cardsContainer.prepend(newCard);
}



export { initialCards, createCard, enableLike, deleteCard, handleCardClick, addCard };