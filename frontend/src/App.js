import { Route } from 'react-router-dom';
import SignInPage from './components/SignInPage/Index';
import SplashPage from './components/Splash/Index';
import { Redirect, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from './store/users';
import { recieveCurrentUser } from './store/session';

function App() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  { currentUser ? <Redirect to="/"/> : <Redirect to="/login"/> }

  return (
    <>
      <Switch>
        <Route exact path="/login">
          <SignInPage/>
        </Route>
        <Route path="/">
            <SplashPage /> 
        </Route>
      </Switch>
    </>
  );
}

export default App;
