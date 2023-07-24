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
        dispatch(logout()).then(() => history.push("/login"));
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
                <ul className="profile-dropdown">
                    <li>
                        <button onClick={handleLogout}>LogOut</button>
                    </li>
                </ul>
            )}
        </>
    )
}

export default ProfileButton;