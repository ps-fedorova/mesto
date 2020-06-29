export default class API {
  constructor(url, token) {
    this._apiUrl = url;
    this._token = token;
  }

  _fetch(url, options) {
    return fetch(this._apiUrl + url, options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(` Все пропало. Ошибка: ${res.status}`);
      })
      .catch(err => console.log(err));
  }


// загрузить информацию о пользователе с сервера
  getUserInitialInfo() {
    return this._fetch('/users/me', {
      headers: {
        method: 'GET',
        authorization: this._token
      }
    })
  }

  // редактировать профиль
  editUserInfo(profile) {
    return this._fetch('/users/me', {
      method: 'PATCH', // Метод PATCH обычно используют для обновления сущностей,
                       // уже существующих на сервере.
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: profile.name,
        about: profile.about
      })
    })
  }

  // загрузить карточки с сервера
  getInitialCards() {
    return this._fetch('/cards', {
      headers: {
        method: 'GET',
        authorization: this._token
      }
    })
  }


  // запостить карточку
  postCard(inputValues) {
    return this._fetch('/cards', {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputValues)
    })
  }





}
