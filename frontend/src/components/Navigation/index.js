import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import './Navigation.css';

const Navigation = () => {
    const currentUser = useSelector(state => state.entities.users[state.session.currentUser]);

    return (
        <>
            <div className="top-nav-bar">
                <div className="left-nav-links">
                    <button className="home-page-icon"></button>
                </div>
                <div className="center-nav-links">
                    <p>centernav</p>
                </div>
                
                <div className="right-nav-links">
                    <ProfileButton currentUser={currentUser}/>
                </div>
            </div>
        </>
    )
}

export default Navigation;