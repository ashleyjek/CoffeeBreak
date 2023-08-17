import { Route } from 'react-router-dom';
import SignInPage from './components/SignInPage/Index';
import SplashPage from './components/Splash/Index';
import { Redirect, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Profile from './components/Profile/Index.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './store/users';

function App() {
  const currentUser = useSelector(state => state.session.currentUser)

  { currentUser ? <Redirect to="/"/> : <Redirect to="/login"/> }

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
      </Switch>
    </>
  );
}

export default App;
