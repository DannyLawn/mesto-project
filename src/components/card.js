//Импорт данных
import { cardsContainer } from './data.js';



//Создание карточки
function createCard(card, handleCardClick, handleDeleteCard, toggleLike) {
  const cardId = card._id;
  const cardTemplate = cardsContainer.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const cardImage =  cardElement.querySelector('.elements__image');
  const likesCount = cardElement.querySelector('.elements__like-count');

  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardElement.querySelector('.elements__element-title').textContent = card.name;
  cardElement.querySelector('.elements__like-button').addEventListener('click', (evt) => toggleLike(cardId, likesCount, evt));
  cardElement.querySelector('.elements__delete-button').addEventListener('click', () => handleDeleteCard(cardElement, cardId));
  cardImage.addEventListener('click', () => handleCardClick(card.link, card.name));

  return cardElement;
}


//Условия отображения карточек при загрузке (кнопки удаления, активность лайка, количество лайков)
function cardElementsOption(card, userId, cardElement) {
  const likesCount = cardElement.querySelector('.elements__like-count');
  const deleteButton = cardElement.querySelector('.elements__delete-button');
  const likeButton =  cardElement.querySelector('.elements__like-button');

  //Количество лайков
  if (card.likes.length === 0) {
    likesCount.style.display = "none";
  } else {
    likesCount.textContent = card.likes.length;
  }
  //Кнопки удаления
  if (card.owner._id !== userId) {
    deleteButton.style.display = "none";
  }    
  //Активность лайка
  card.likes.forEach((profile) => {
    if (profile._id === userId) {
      likeButton.classList.add('elements__like-button_enabled');
    }
  })
}


//Удаление карточки
const deleteCard = (card) => {
  card.remove();
  card = null;
};



export { createCard, deleteCard, cardElementsOption };