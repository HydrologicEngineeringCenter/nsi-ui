import { createRouteBundle } from 'redux-bundler';
import Main from '../containers/main/main';
import FourOhFour from '../containers/404';

export default createRouteBundle({
  '/': Main,
  '*': FourOhFour
})