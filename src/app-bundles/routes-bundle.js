import { createRouteBundle } from 'redux-bundler';
import Main from '../containers/main/main';
import FourOhFour from '../containers/404';
import LoginPage from '../containers/login/LoginPage.js';

export default createRouteBundle({
  '/': LoginPage,
  '/main': Main,
  '*': FourOhFour
})