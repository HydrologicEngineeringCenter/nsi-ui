import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'redux-bundler-react';
import createStore from './app-bundles';
import cache from './utils/cache';

// Import our root component for the application
import App from './App';

// Import css here, to use a theme, update the link to point at that theme
import './css/bootstrap/css/bootstrap.min.css';
import './css/bootstrap/bootswatch-themes/sandstone/bootstrap.min.css';
import './css/index.css';
import "@corpsmap/corpsmap/css/corpsmap.css";

// Activate the debug module if we're in dev mode
if(process.env.NODE_ENV === 'development'){
  window.localStorage.setItem('debug', true);
}else{
  window.localStorage.removeItem('debug');
}

cache.getAll().then((initialData) => {
  // Create the store to hold all of our data
  const store = createStore(initialData);

  // Render our app with the Provider at the top level
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, 
    document.getElementById('root')
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();

})