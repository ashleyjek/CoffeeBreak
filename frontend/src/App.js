import { Route } from 'react-router-dom';
import SignInPage from './components/SignInPage/Index';
import SplashPage from './components/Splash/SplashPage';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

function App() {

  return (
    <>
      <Switch>
        <Route exact path="/login">
          <SignInPage/>
        </Route>
        <Route exact path="/">
          <SplashPage/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
