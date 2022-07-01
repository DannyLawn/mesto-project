//Импорт данных
import { openCardPopup, openCardImage, openCardTitle, cardsContainer, deleteCardPopup, formDeleteCard  } from './data.js';

//Импорт утилитарных функций
import { closePopup, openPopup } from './utils.js';

//Импорт api
import { removeCard, likeCard } from './api.js';



//Создание карточки
function createCard(card) {
  const cardId = card._id;
  const cardTemplate = cardsContainer.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const cardImage =  cardElement.querySelector('.elements__image');
  const likesCount = cardElement.querySelector('.elements__like-count');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  if (card.likes.length === 0) {
    likesCount.style.display = "none";
  } else {
    likesCount.textContent = card.likes.length;
  }

  cardElement.querySelector('.elements__element-title').textContent = card.name;

  cardElement.querySelector('.elements__like-button').addEventListener('click', toggleLike);

  cardElement.querySelector('.elements__delete-button').addEventListener('click', () => handleDeleteCard(cardElement, cardId));

  cardImage.addEventListener('click', () => handleCardClick(card.link, card.name));

  return cardElement;
}


//Удаление карточки
const deleteCard = (card) => {
  card.remove();
  card = null;
};


//Функция удаления, вызываемая из createCard
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
  };
  deleteCardPopup.addEventListener('submit', handleRemoveCardSubmit);

  openPopup(deleteCardPopup);
}



//Переключатель лайка
function toggleLike(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('elements__like-button_enabled');
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



export { createCard, toggleLike, handleCardClick, addCard };