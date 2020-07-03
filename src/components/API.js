export default class API {
  constructor({baseUrl, authorization}) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
  }

  _fetch(url, params) {
    return fetch(this._baseUrl + url, params)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ну вот, все пропало (Ошибка: ${res.status})`);
      })
  }

  getInitialUserInfo() {
    return this._fetch('/users/me', {
      method: 'GET',
      headers: {
        authorization: this._authorization
      }
    });
  }

  editUserInfo(formValues) {
    return this._fetch('/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formValues.name,
        about: formValues.about
      })
    });
  }

  editUserAvatar(formValues) {
    return this._fetch('/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: formValues.avatar
      })
    });
  }

  getInitialCards() {
    return this._fetch('/cards', {
      method: 'GET',
      headers: {
        authorization: this._authorization
      }
    });
  }

  postUserCard(formValues) {
    return this._fetch('/cards', {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formValues.title,
        link: formValues.src
      })
    });
  }

  deleteCard(cardId) {
    return this._fetch('/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    });
  }

  putLike(cardId) {
    return this._fetch('/cards/likes/' + cardId, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    });
  }

  deleteLike(cardId) {
    return this._fetch('/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    });
  }
}
