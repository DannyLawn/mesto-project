const config = {
  url: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
    "Content-type": "application/json",
    "Authorization": "04094868-01f7-4148-b349-0bbb01e31812"
  }
}

const userInfoSelectors = {
  nameSelector: '.profile__name',
  activitySelector: '.profile__activity',
  avatarSelector: '.profile__avatar'
}

export { config, userInfoSelectors };