import { useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NavDropDown from "./NavDropDown";
import SearchBar from "./SearchBar";
import './Navigation.css';

const Navigation = () => {
    const currentUser = useSelector(state => state.session.currentUser);

    return (
        <>
            <div className="top-nav-bar">
                <div className="left-nav-links">
                    <Link to="/">
                        <img 
                            alt="logo-icon" 
                            src="https://live.staticflickr.com/65535/53069030957_d9041f159e_b.jpg" 
                            className="home-page-icon"/> 
                    </Link>
                    <SearchBar/>
                </div>
                <div 
                    className="center-nav-links">
                    {/* <button className="nav-friends-button">Friends</button> */}
                    <a href="/">
                        <button 
                            className="nav-home-button"><FaHome/></button>
                    {/* <button className="nav-groups-button">Groups</button> */}
                    </a>
                </div>
                <div className="right-nav-links">
                    <NavDropDown currentUser={currentUser}/>
                </div>
            </div>
        </>
    )
}

export default Navigation;