import { Route } from 'react-router-dom';
import SignInPage from './components/SignInPage/Index';
import SplashPage from './components/Splash/Index';
import { Redirect, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from "react-redux";

function App() {
  const currentUser = useSelector(state => state.session.user);

  return (
    <>
      <Switch>
        <Route exact path="/login">
            {currentUser ? <Redirect to="/"/> : <SignInPage/>}
        </Route>
        <Route exact path="/">
          <SplashPage/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
