import '../pages/index.css';

import { Api } from '../components/Api.js';
import {UserInfo} from '../components/UserInfo.js'
import { userInfoSelectors, config } from '../utils/constans.js';

const api = new Api(config);
const userInfo = new UserInfo(userInfoSelectors);

api.getUserInfo()
.then(res => {
userInfo.renderUserInfo(res.name, res.about);
});