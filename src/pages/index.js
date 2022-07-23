import '../pages/index.css';

import { Api } from '../components/Api.js';
import {UserInfo} from '../components/UserInfo.js'
import { config, cardsContainer, userInfoSelectors, cardSelectors } from '../utils/constans.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js'

const api = new Api(config);
const userInfo = new UserInfo(userInfoSelectors);
const cardSection = new Section(cardsContainer, (cardData) => {
  const placeCard = new Card({cardData, cardSelectors, 
    deleteCardHandler: () => { 
      
  }, likeCardHandler: () => {
  
  }, clickImageHandler: () => {

;  }})
  const newPlaceCard = placeCard.generate(userInfo.id);
  cardSection.addElement(newPlaceCard)
})


Promise.all([api.getUserInfo(), api.getAllCards()])
.then(([currentUserInfo, initialCards]) => {
  userInfo.renderUserInfo(currentUserInfo.name, currentUserInfo.about);
  userInfo.renderUserAvatar(currentUserInfo.avatar);
  userInfo.getUserId(currentUserInfo._id);


  cardSection.renderElements(initialCards);

})