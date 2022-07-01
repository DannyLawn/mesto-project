//Импорт данных
import { openCardPopup, openCardImage, openCardTitle, cardsContainer, deleteCardPopup } from './data.js';

//Импорт утилитарных функций
import { closePopup, openPopup } from './utils.js';

//Импорт api
import { removeCard, likeCard, offLikeCard } from './api.js';



//Создание карточки
function createCard(card) {
  const cardId = card._id;
  const cardTemplate = cardsContainer.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const cardImage =  cardElement.querySelector('.elements__image');
  const likesCount = cardElement.querySelector('.elements__like-count');

  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardElement.querySelector('.elements__element-title').textContent = card.name;
  cardElement.querySelector('.elements__like-button').addEventListener('click', function (evt) {
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
  });
  cardElement.querySelector('.elements__delete-button').addEventListener('click', () => handleDeleteCard(cardElement, cardId));
  cardImage.addEventListener('click', () => handleCardClick(card.link, card.name));

  return cardElement;
}


//Удаление карточки
const deleteCard = (card) => {
  card.remove();
  card = null;
};


//Функция удаления 
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



export { createCard, handleCardClick, addCard };