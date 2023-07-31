import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Navigation from '../Navigation/index';
import { fetchUsers } from '../../store/users'
import { useEffect } from "react";
import Posts from '../Posts/index'


const Profile = ({currentUser}) => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(state => state.entities.users[userId])
    useEffect(() => {
        // dispatch(fetchProfileUser(userId))
        dispatch(fetchUsers())
    }, [])
    
    return (
        <>
        { user ?
        <>
            <Navigation />
            <div className="cover-photo-container">
                <div className="cover-photo-gradient-container">
                    <div className="cover-photo-buttons-container">
                        <button className="add-cover-photo">
                            Add cover photo
                        </button>
                    </div>
                </div>
            </div>
            <div className="profile-header-container">
                <div className="profile-photo-container">
                    <img className="profile-photo"></img>
                </div>
                <div className="profile-header-name-container">
                    <p className="profile-name-header">
                        {user.firstName} {user.lastName}
                    </p>
                </div>
                <div className="profile-edit-button-container">
                    <button className="profile-edit-button">
                        Edit profile
                    </button>
                </div>
            </div>
            <div className="profile-body-container">
                <div className="profile-left-container">
                    <div className="profile-intro-container">
                        <p>Intro</p>
                        <div className="about-me-section">
                            {user.email}
                            <br></br>
                            {user.birthday}
                        </div>
                    </div>
                    <div className="profile-friends-list">
                        Friends
                    </div>
                </div>
                <div className="profile-right-container">
                    <Posts 
                        currentUser={currentUser}/>
                </div>
            </div>
            
            
        </>
        : null }  
        </>
    )
}

export default Profile;