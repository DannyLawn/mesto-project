import "../pages/index.css";

import { Api } from "../components/Api.js";
import { UserInfo } from "../components/UserInfo.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import {
  config,
  cardsContainer,
  userInfoSelectors,
  cardSelectors,
  typesOfPopups,
  popupOptions,
  buttons
} from "../utils/constans.js";

const api = new Api(config);
const userInfo = new UserInfo(userInfoSelectors);
const popupWithImage = new PopupWithImage(
  typesOfPopups.openCardPopup,
  popupOptions
);

const popupWithProfile = new PopupWithForm(
  typesOfPopups.editProfilePopup,
  popupOptions,
  (inputValues) => {
    popupWithProfile.toggleSavingStatus();
    api
      .editProfile({ name: inputValues.profileName, about: inputValues.profileActivity})
      .then((res) => {
        userInfo.renderUserInfo(res.name, res.about);
        popupWithProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupWithProfile.toggleSavingStatus());
  }
);

buttons.profileOpenButton.addEventListener('click', () => {
  const actualUserInfo = userInfo.getUserInfo();
  const form = document.forms.editProfile;
  form.elements.profileName.value = actualUserInfo.name;
  form.elements.profileActivity.value = actualUserInfo.activity;
  popupWithProfile.open();
})

const cardSection = new Section(cardsContainer, (cardData) => {
  const placeCard = new Card({
    cardData,
    cardSelectors,
    deleteCardHandler: () => {},
    likeCardHandler: () => {
      if (!placeCard.isLiked) {
        api
          .putLike(placeCard.id)
          .then((cardData) => {
            placeCard.toggleLikeModifier(cardData.likes);
          })
          .catch((err) => console.log(err));
      } else {
        api
          .removeLike(placeCard.id)
          .then((cardData) => {
            placeCard.toggleLikeModifier(cardData.likes);
          })
          .catch((err) => console.log(err));
      }
    },
    clickImageHandler: () => {
      popupWithImage.open(cardData.link, cardData.name);
    },
  });
  const newPlaceCard = placeCard.generate(userInfo.userId);
  cardSection.addElement(newPlaceCard);
});

Promise.all([api.getUserInfo(), api.getAllCards()]).then(
  ([currentUserInfo, initialCards]) => {
    userInfo.renderUserInfo(currentUserInfo.name, currentUserInfo.about);
    userInfo.renderUserAvatar(currentUserInfo.avatar);
    userInfo.getUserId(currentUserInfo._id);
    cardSection.renderElements(initialCards);
  }
);
