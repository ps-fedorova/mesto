export default class UserInfo {
  constructor(userName, userDescription, userAvatar) {
    this._name = userName;
    this._description = userDescription;
    this._avatar = userAvatar;
  }

  getUserInfo() {
    return {
      username: this._name.textContent,
      description: this._description.textContent
    }
  }

  setUserAvatar({avatar}) {
    this._avatar.src = avatar;
  }

  setUserInfo({name, about}) {
    this._avatar.alt = name;
    this._name.textContent = name;
    this._description.textContent = about;
  }
}
