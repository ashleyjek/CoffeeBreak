import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from "react"; 
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../store/session";
import './Navigation.css';
import { FaDoorOpen } from "react-icons/fa";

const NavDropDown = () => {
    // const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    // const user = useSelector(state => state.entities.users[currentUser.id])
    const currentUser = useSelector(state => state.session.currentUser);
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = (e) => {
        if (showMenu) return;
        e.stopPropagation();
        setShowMenu(true);
    };

    
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout()).then((res) => {
            if (res.ok) {
                (history.push("/login"));
            }
        })
    };
    
    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = (e) => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);
    
    if (!currentUser) return null;
    
    return (
        
        <>  
            <img src={currentUser.avatarSrc} className="profile-icon" onClick={openMenu}></img>
            {showMenu && (
                <ul className="profile-dropdown-container">
                    <li key="p-link" className="profile-links-container">
                        <div className="profile-name-container">
                        {currentUser && (
                            <div className="name-container">
                                <a href={'/users/' + currentUser.id}>
                                    <img src={currentUser.avatarSrc} className="profile-dropdown-icon"></img>
                                    <span id="profile-name">{currentUser.firstName}</span>
                                    <span id="profile-name">{currentUser.lastName}</span>
                                </a>
                            </div>
                            )}
                            <div className="view-profile-text-container">
                                <a href={'/users/' + currentUser.id}>
                                    <div className="view-profile-text">View your Profile</div>
                                </a>
                            </div>
                        </div>
                    </li>
                    <li key="logout-button" className="logout-tab">
                        <div className="logout-button-container">
                            <button className="logout-icon"><FaDoorOpen/></button>
                            <button className="logout-button" onClick={handleLogout}>Log Out</button>
                        </div>
                    </li>
                </ul>
            )}
        </>
    )
}

export default NavDropDown;