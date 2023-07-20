import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { restoreSession } from './store/csrf';

const root = ReactDOM.createRoot(document.getElementById('root'));
const initializeApp = () => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  let initialState = {};

  if (currentUser) {
    initialState = {
      users: {
        [currentUser.id]: currentUser
      }
    };
  };
};

const store = configureStore();
window.store = store;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

restoreSession().then(initializeApp);
