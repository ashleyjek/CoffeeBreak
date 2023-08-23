import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { useState } from 'react';
import { Redirect, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SignInPage from './components/SignInPage/SignInPage';
import SplashPage from './components/Splash/Splash';
import Profile from './components/Profile/ProfileIndex.js';
import { useEffect } from 'react';
import { getCurrentUser } from './store/session';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

function App() {
  const currentUser = useSelector(state => state.session.currentUser)  
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (sessionStorage.currentUser !== 'null') {
      dispatch(getCurrentUser());
    } else {
      history.push("/login")
    }
  }, [])
  // { currentUser ? <Redirect to="/"/> : <Redirect to="/login"/> }

  return (
    <>
      <Switch>
        <Route exact path="/login">
          <SignInPage currentUser={currentUser}/>
        </Route>
        <Route exact path="/">
            <SplashPage /> 
        </Route>
        <Route exact path="/users/:userId">
            <Profile/>
        </Route>
        <Route exact path="*">
          <NotFoundPage/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
