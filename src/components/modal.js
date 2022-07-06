//Импорт глобальных переменных
import { popups } from './data.js';



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


//Отображать процесс загрузки на кнопках submit
function renderLoadingPopup(popup, string) {
  const submit = popup.querySelector('.popup__input-submit');
  submit.value = string;
}


//Закрытие на ESC  
function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}



export { openPopup, closePopup, closeOnEsc, renderLoadingPopup };

