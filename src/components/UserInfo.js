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

  _setUserInfo(newName, newActivity) {
    this._name = newName;
    this._activity = newActivity;
  }

  getUserInfo() {
    return {
      name: this._name,
      activity: this._activity,
    };
  }

  getUserId(id) {
    this.userId = id;
  }

  renderUserInfo(newName, newActivity) {
    this._setUserInfo(newName, newActivity);
    this._nameElement.textContent = this._name;
    this._activityElement.textContent = this._activity;
  }

  renderUserAvatar(newAvatar) {
    this._setUserAvatar(newAvatar);
    this._avatarElement.src = this._avatar;
  }

  _setUserAvatar(newAvatar) {
    this._avatar = newAvatar;
  }
}

export { UserInfo };
