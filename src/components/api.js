const config = {
  url: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
    "Content-type": "application/json",
    "Authorization": "04094868-01f7-4148-b349-0bbb01e31812"
  }
}


const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
}


//Загружаю данные пользователя
function uploadingUserInfo() {
  return fetch(`${config.url}/users/me `, {
    headers: config.headers
  })
    .then(onResponce)
}

//Загружаю все карточки
function getAllCards() {
  return fetch(`${config.url}/cards`, {
    headers: config.headers
  })
    .then(onResponce)
}

//Редактирую данные профиля
function editProfile(data) {
  return fetch(`${config.url}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data)
  })
    .then(onResponce)
}

//Редактирую аватарку профиля
function editAvatarProfile(data) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data)
  })
    .then(onResponce)
}


//Удаляю карточку
function removeCard(dataId) {
  return fetch(`${config.url}/cards/${dataId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(onResponce)
}

//Добавляю карточку
function addNewCard(data) {
  return fetch(`${config.url}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(data)
  })
    .then(onResponce)
}

//Добавить лайк
function likeCard(cardId) {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(onResponce)
}

//Убрать лайк
function offLikeCard(cardId) {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(onResponce)
}











export { getAllCards, addNewCard, removeCard, editProfile, uploadingUserInfo, editAvatarProfile, likeCard, offLikeCard };