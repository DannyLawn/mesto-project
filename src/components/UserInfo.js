class UserInfo {
  constructor(userInfoSelectors) {
    this._nameElement = document.querySelector(userInfoSelectors.nameSelector);
    this._activityElement = document.querySelector(
      userInfoSelectors.activitySelector
    );
    this._avatarElement = document.querySelector(
      userInfoSelectors.avatarSelector
    );
    this._name = "";
    this._activity = "";
    this._avatar = "";
  }

  _setUserInfo({ name, about, avatar, _id }) {
    this._name = name;
    this._activity = about;
    this._avatar = avatar;
    this.id = _id;
  }

  getUserInfo() {
    return {
      profileName: this._name,
      profileActivity: this._activity,
    };
  }

  // getUserId(id) {
  //   this.userId = id;
  // }

  renderUserInfo({ name, about, avatar, _id }) {
    this._setUserInfo({ name, about, avatar, _id });
    this._nameElement.textContent = this._name;
    this._activityElement.textContent = this._activity;
  }

  renderUserAvatar({ name, about, avatar, _id }) {
    this._setUserInfo({ name, about, avatar, _id });
    this._avatarElement.src = this._avatar;
  }

  // _setUserAvatar(newAvatar) {
  //   this._avatar = newAvatar;
  // }
}

export { UserInfo };
