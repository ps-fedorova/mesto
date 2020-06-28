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


  getInitialCards() {
    return this._fetchData('/cards', {
      headers: {
        authorization: this._token
      }
    })
  }

}
