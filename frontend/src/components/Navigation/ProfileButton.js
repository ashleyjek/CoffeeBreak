import { useDispatch } from "react-redux";
import { useEffect, useState} from "react"; 
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../store/session";
import './Navigation.css';

const ProfileButton = ({currentUser}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = (e) => {
        e.stopPropagation();
        if (showMenu) return;
        setShowMenu(true);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        history.push("/login");
        dispatch(logout())
    }

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    return (
        <>
            <button className="profile-icon" onClick={openMenu}></button>
            {showMenu && (
                <ul className="profile-dropdown-container">
                    <li className="profile-links-container">
                        <div className="profile-name-container">
                            <div className="name-container">
                            <button className="profile-dropdown-icon"></button>
                                <span id="profile-name">{currentUser.firstName.charAt(0).toUpperCase() + currentUser.firstName.slice(1).toLowerCase()}</span>
                                <span id="profile-name">{currentUser.lastName.charAt(0).toUpperCase() + currentUser.lastName.slice(1).toLowerCase()}</span>
                            </div>
                            <div className="view-profile-text">View your Profile</div>
                        </div>
                    </li>
                    <li className="logout-tab">
                        <div className="logout-button-container">
                            <button className="logout-icon"></button>
                            <button className="logout-button" onClick={handleLogout}>Log Out</button>
                        </div>
                    </li>
                </ul>
            )}
        </>
    )
}

export default ProfileButton;