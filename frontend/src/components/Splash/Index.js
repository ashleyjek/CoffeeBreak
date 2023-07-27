import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Navigation from "../Navigation/index";
import Newsfeed from "../Newsfeed";
import { useEffect } from "react";
import { fetchUser } from "../../store/users";
import './Splash.css';

const SplashPage = () => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const dispatch = useDispatch();
    const history = useHistory();
    
    if (!currentUser) {
        history.push("/login");
    }

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchUser(currentUser));        
        }
    }, [currentUser])
    

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