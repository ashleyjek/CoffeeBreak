import { Route } from 'react-router-dom';
import SignInPage from './components/SignInPage/Index';
import SplashPage from './components/Splash/Index';
import { Redirect, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Profile from './components/Profile/Index.js';

function App() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  { currentUser ? <Redirect to="/"/> : <Redirect to="/login"/> }

  return (
    <>
      <Switch>
        <Route exact path="/login">
          <SignInPage/>
        </Route>
        <Route exact path="/">
            <SplashPage /> 
        </Route>
        <Route exact path="/users/:userId">
            <Profile currentUser={currentUser}/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
