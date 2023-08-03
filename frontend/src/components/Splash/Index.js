import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Navigation from "../Navigation/index";
import Newsfeed from "../Newsfeed";
import { useEffect } from "react";
import { fetchUser } from "../../store/users";
import { useSelector } from "react-redux";
import './Splash.css';

const SplashPage = () => {
    const currentUser = useSelector(state => state.session.currentUser)
    const history = useHistory();
    
    if (!currentUser) {
        history.push("/login");
    } 
    
    return (
        <div className="splash-index">
            <Navigation/>
            <Newsfeed />
        </div>
    )
}

export default SplashPage;