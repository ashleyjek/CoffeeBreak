import { Route } from 'react-router-dom';
import SignInModal from './components/SignInPage/SignInModal';
import SplashPage from './components/Splash/SplashPage';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import SignUpModal from './components/SignUpModal/SignUpModal';

function App() {

  return (
    <>
      <Switch>
        <Route exact path="/login">
          <SignInModal/>
        </Route>
        <Route exact path="/">
          <SplashPage/>
        </Route>
      </Switch>
      <SignUpModal />
    </>
  );
}

export default App;
