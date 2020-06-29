export default class API {
  constructor(url, token) {
    this._apiUrl = url;
    this._token = token;
  }

  _fetchData(url, options) {
    return fetch(this._apiUrl + url, options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(` Все пропало. Ошибка: ${res.status}`);
      })
  }
  getUserInitialInfo() {
    return this._fetchData('/users/me', {
      headers: {
        authorization: this._token
      }
    })
  }

  getInitialCards() {
    return this._fetchData('/cards', {
      headers: {
        authorization: this._token
      }
    })
  }


}
