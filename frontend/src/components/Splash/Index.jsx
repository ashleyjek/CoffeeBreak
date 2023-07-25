import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Navigation from "../Navigation/index";
import Newsfeed from "../Newsfeed";
import './Splash.css';

const SplashPage = () => {
    const history = useHistory();
    const currentUser = useSelector(state => state.session.currentUser);
    if (currentUser === null) {
        history.push('/login');        
    }
    
    return (
        <>
            <div className="splash-index">
                <Navigation/>
                <Newsfeed />
            </div>
        </>
    )
}

export default SplashPage;