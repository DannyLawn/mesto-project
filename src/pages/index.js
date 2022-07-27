import "../pages/index.css";

import { Api } from "../components/Api.js";
import { UserInfo } from "../components/UserInfo.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { popupWithConfirmation } from "../components/PopupWithConfirmation.js";
import {
  config,
  cardsContainer,
  formList,
  userInfoSelectors,
  cardSelectors,
  typesOfPopups,
  popupOptions,
  buttons,
} from "../utils/constans.js";
import { validationObject } from "../utils/constans.js";
import { FormValidator } from "../components/FormValidator";

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
      .editProfile({
        name: inputValues.profileName,
        about: inputValues.profileActivity,
      })
      .then((res) => {
        userInfo.renderUserInfo(res);
        popupWithProfile.close();
      })
      .catch((err) => {
        console.log(err.type);
      })
      .finally(() => popupWithProfile.toggleSavingStatus());
  }
);

buttons.profileOpenButton.addEventListener("click", () => {
  const actualUserInfo = userInfo.getUserInfo();
  popupWithProfile.setInputValues(actualUserInfo);
  popupWithProfile.open();
});

const popupWithAvatar = new PopupWithForm(
  typesOfPopups.editAvatarPopup,
  popupOptions,
  (inputValues) => {
    popupWithAvatar.toggleSavingStatus();
    api
      .editAvatarProfile({ avatar: inputValues.avatarImageLink })
      .then((res) => {
        userInfo.renderUserAvatar(res);
        popupWithAvatar.close();
      })
      .catch((err) => {
        console.log(err.type);
      })
      .finally(() => popupWithAvatar.toggleSavingStatus());
  }
);

buttons.avatarOpenButton.addEventListener("click", () => {
  popupWithAvatar.open();
});

const popupWithCard = new PopupWithForm(
  typesOfPopups.createCardPopup,
  popupOptions,
  (inputValues) => {
    popupWithCard.toggleSavingStatus();
    api
      .addNewCard({
        name: inputValues.cardName,
        link: inputValues.cardImageLink,
      })
      .then((res) => {
        cardSection.addElement(res);
        popupWithCard.close();
      })
      .catch((err) => {
        console.log(err.type);
      })
      .finally(() => popupWithCard.toggleSavingStatus());
  }
);

buttons.placeOpenButton.addEventListener("click", () => {
  popupWithCard.open();
});

let cardToDelete = null;
const popupWithDeletion = new popupWithConfirmation(
  typesOfPopups.deleteCardPopup,
  popupOptions,
  () => {
    popupWithDeletion.toggleSavingStatus();
    api
      .removeCard(cardToDelete.id)
      .then(() => {
        cardToDelete.remove();
        popupWithDeletion.close();
      })
      .catch((err) => {
        console.log(err.type);
      })
      .finally(() => popupWithDeletion.toggleSavingStatus());
  }
);

const cardSection = new Section(cardsContainer, (cardData) => {
  const placeCard = new Card({
    cardData,
    cardSelectors,
    deleteCardHandler: () => {
      cardToDelete = placeCard;
      popupWithDeletion.open();
    },
    likeCardHandler: () => {
      if (!placeCard.isLiked) {
        api
          .putLike(placeCard.id)
          .then((cardData) => {
            placeCard.toggleLikeModifier(cardData.likes);
          })
          .catch((err) => console.log(err.type));
      } else {
        api
          .removeLike(placeCard.id)
          .then((cardData) => {
            placeCard.toggleLikeModifier(cardData.likes);
          })
          .catch((err) => console.log(err.type));
      }
    },
    clickImageHandler: () => {
      popupWithImage.open(cardData.link, cardData.name);
    },
  });
  const newPlaceElement = placeCard.generate(userInfo.id);
  return newPlaceElement;
});

Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(([currentUserInfo, initialCards]) => {
    userInfo.renderUserInfo(currentUserInfo);
    userInfo.renderUserAvatar(currentUserInfo);
    // userInfo.getUserId(currentUserInfo._id);
    cardSection.renderElements(initialCards);
  })
  .catch((err) => console.log(err.type));

formList.forEach((formElement) => {
  const formValidator = new FormValidator(formElement, validationObject);
  formValidator.enableValidation();
});
