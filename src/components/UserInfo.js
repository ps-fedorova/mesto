export default class UserInfo {
  constructor({userName, userDescription, userAvatar}) {
    this._name = userName;
    this._about = userDescription;
    this._avatar = userAvatar;
  }

  getUserInfo() {
    this._element = {
      name: this._name.textContent,
      about: this._about.textContent,
      link: this._avatar.src
    }
    return this._element;
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setUserAvatar({avatar}) {
    this._avatar.src = avatar;
  }

  setUserId(id) {
    this._userId = id;
  }

  getUserId() {
    return this._userId;
  }

}
