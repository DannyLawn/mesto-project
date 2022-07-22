import '../pages/index.css';

import { Api } from '../components/Api.js';
import {UserInfo} from '../components/UserInfo.js'
import { config, cardsContainer, userInfoSelectors, cardElementSelectors } from '../utils/constans.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js'

const api = new Api(config);
const userInfo = new UserInfo(userInfoSelectors);
const cardSection = new Section(cardsContainer, (cardData) => {
  const placeCard = new Card(cardData, cardElementSelectors)
  const newplaceCard = placeCard.generate();
  cardSection.addElement(newplaceCard)
})

api.getUserInfo()
.then(res => {
userInfo.renderUserInfo(res.name, res.about);
userInfo.renderUserAvatar(res.avatar);
});

api.getAllCards()
.then(res => {
  cardSection.renderElements(res)
})
