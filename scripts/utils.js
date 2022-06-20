//Импорт глобальных переменных
import { validationObject } from './data.js';
 
//Импорт валидации форм
import { hideInputError, toggleButtonState } from './validate.js';



//Обработчики открытия/закрытия попапов
function openPopup(popup) {
  const formElement = popup.querySelector('.popup__form');
  if (formElement !== null) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input-text'));
    const buttonElement = formElement.querySelector('.popup__input-submit');
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationObject);
    });
    toggleButtonState(inputList, buttonElement, validationObject);
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



export { openPopup, closePopup, closeOnX, closeOnEsc, closeOnOverlay };