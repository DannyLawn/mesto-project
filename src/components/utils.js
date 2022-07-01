//Импорт глобальных переменных
import { validationObject, popups } from './data.js';
 
//Импорт валидации форм
import { hideInputError, toggleButtonState } from './validate.js';



//Обработчики открытия/закрытия попапов
function openPopup(popup) {
  document.addEventListener('keydown', closeOnEsc);
  popup.classList.add('popup_opened');
}  

function closePopup(popup) {
  document.removeEventListener('keydown', closeOnEsc);
  popup.classList.remove('popup_opened');
}  


//Закрытие на X и Overlay
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
    }
    if (evt.target.classList.contains('popup__toggle')) {
      closePopup(popup);
    }
  });
});


//Показывать процесс загрузки(на кнопках submit)
function renderLoading(isLoading, submit) {
  if(isLoading) {
    submit.value = "Сохранение...";
  } else { return; }
}


//Закрытие на ESC  
function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


//Сброс валидации
function resetValidation(popup) {
  const formElement = popup.querySelector('.popup__form');
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-text'));
  const buttonElement = formElement.querySelector('.popup__input-submit');
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationObject);
  });
  toggleButtonState(inputList, buttonElement, validationObject);
}



export { openPopup, closePopup, closeOnEsc, resetValidation, renderLoading };