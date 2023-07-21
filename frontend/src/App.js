import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const currentUser = useSelector(state => state.session);
  if (!currentUser) {
    <Redirect to = "/login"/>
  }
  return (
    <h1>Hello from App</h1>
  );
}

export default App;
