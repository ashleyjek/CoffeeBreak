import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { restoreSession } from './store/csrf';
import { csrfFetch } from './store/csrf';
import { login, signUp, logout } from './store/session';
import configureStore from './store/index'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { removeErrors } from './store/errors';
import { fetchUser, fetchUsers } from './store/users';
import { deletePost, fetchPost, fetchPosts, updatePost } from './store/posts';
import * as commentActions from './store/comments'
import { createFriend, removeFriend } from './store/friendships';
import * as likeActions from './store/likes'

const store = configureStore();

//
if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.signUp = signUp;
  window.login = login;
  window.logout = logout;
  window.restoreSession = restoreSession;
  window.removeErrors = removeErrors;
  window.fetchUser = fetchUser;
  window.fetchUsers = fetchUsers;
  window.fetchPosts = fetchPosts;
  window.fetchPost = fetchPost;
  window.deletePost = deletePost;
  window.updatePost = updatePost;
  window.commentActions = commentActions;
  window.createFriend = createFriend;
  window.removeFriend = removeFriend;
  window.likeActions = likeActions;
  
};
//


const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const initializeApp = () => {

  root.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
  );
}
if (sessionStorage.getItem("X-CSRF-Token") === null ||
    sessionStorage.getItem('currentUser') === null) {
      store.dispatch(restoreSession()).then(initializeApp);
    } else {
      initializeApp();
    }
