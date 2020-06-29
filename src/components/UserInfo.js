export default class UserInfo {
  constructor({userName, userDescription,}) {
    this._name = userName;
    this._about = userDescription;
  }

  getUserInfo() {
    this._element = {
      name: this._name.textContent,
      about: this._about.textContent
    }
    return this._element;
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
