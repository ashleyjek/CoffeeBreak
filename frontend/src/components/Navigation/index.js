import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import './Navigation.css';

const Navigation = () => {
    const currentUser = useSelector(state => state.entities.users[state.session.currentUser]);

    return (
        <>
            <div className="top-nav-bar">
                <div className="left-nav-links">
                    <img src="https://live.staticflickr.com/65535/53069030957_d9041f159e_b.jpg" className="home-page-icon"/>
                    <input className="home-search-bar" placeholder="Search Coffeebook"/>
                </div>
                <div className="center-nav-links">
                    {/* <button className="nav-friends-button">Friends</button> */}
                    <button className="nav-home-button">Home</button>
                    {/* <button className="nav-groups-button">Groups</button> */}
                </div>
                
                <div className="right-nav-links">
                    <ProfileButton currentUser={currentUser}/>
                </div>
            </div>
        </>
    )
}

export default Navigation;