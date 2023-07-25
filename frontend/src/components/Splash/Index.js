import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Navigation from "../Navigation/index";
import Newsfeed from "../Newsfeed";
import { useEffect } from "react";
import { fetchUser } from "../../store/users";
import './Splash.css';

const SplashPage = () => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchUser(currentUser));
    }, [])

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