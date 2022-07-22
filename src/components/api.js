class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponce(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }
  
  
  //Загружаю данные пользователя
  getUserInfo() {
    return fetch(`${this._url}/users/me `, {
      headers: this._headers
    })
      .then(this._checkResponce)
  }
  
  //Загружаю все карточки
  getAllCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponce)
  }
  
  //Редактирую данные профиля
  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponce)
  }
  
  //Редактирую аватарку профиля
  editAvatarProfile(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponce)
  }
  
  
  //Удаляю карточку
  removeCard(dataId) {
    return fetch(`${this._url}/cards/${dataId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponce)
  }
  
  //Добавляю карточку
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponce)
  }
  
  //Добавить лайк
  putLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponce)
  }
  
  //Снять лайк
  removeLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponce)
  }

  
}




export { Api };