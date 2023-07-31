import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Navigation from '../Navigation/index';
import { fetchProfileUser } from '../../store/users'
import { useEffect } from "react";
import Posts from "../Posts/index";
import Modal from "../Modal/Modal";
import "../Profile/Profile.css"
import { FaBirthdayCake, FaCamera, FaMailBulk, FaPencilAlt } from "react-icons/fa";

const Profile = () => {
    const currentUser = useSelector(state => state.session.currentUser)
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(state => state.entities.users[userId])
    const modal = useSelector(state => state.ui);

    useEffect(() => {
        dispatch(fetchProfileUser(userId))
    }, [])
    
    return (
        <>
        { user ?
        <>
            { modal.modal ? 
                <div className="post-form-modal-bg">
                    <Modal modal={modal.modal} post={modal.post} />
                </div> 
            : null }
            <Navigation />
            <div className="user-profile-bg">
                <div className="profile-header-bg">
                    <div className="user-profile-container">
                        <div className="cover-photo-gradient-container">
                            <div className="cover-photo-container">
                                <img src={user.coverSrc}></img>
                            </div>
                            <div className="cover-photo-buttons-container">
                                <button className="add-cover-photo">
                                <FaCamera/> Add cover photo
                                </button>
                            </div>
                        </div>
                        <div className="profile-header-container">
                            <div className="profile-photo-container">
                                {user?.avatarSrc ? 
                                    <img src={user.avatarSrc} className="profile-photo"></img>
                                : null }
                                <button className="profile-photo-cam-button">
                                    <FaCamera/>
                                </button>
                            </div>
                            <div className="profile-header-name-container">
                                <p className="profile-name-header">
                                    {user.firstName} {user.lastName}
                                </p>
                            </div>
                            <div className="profile-edit-button-container">
                                <button className="profile-edit-button">
                                   <FaPencilAlt/> Edit profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-body-bg">
                    <div className="profile-body-container">
                        <div className="profile-left-container">
                            <div className="profile-intro-container">
                                    <div className="intro-header">Intro </div>
                                    <div className="bio-section">
                                        {/* BIO OR BUTTON TO ADD BIO */}
                                    </div>
                                    <div className="details-header">
                                            Details
                                    </div>
                                    <div className="about-me-details">
                                        <div classname="details-labels-container">
                                            <p className="user-labels"><FaMailBulk/> </p>
                                            <p className="user-labels"><FaBirthdayCake/> </p>
                                        </div>
                                        <div classname="details-info-container">
                                            <p className="user-info">{user.email}</p>
                                            <p className="user-info">{user.birthday}</p>
                                        </div>
                                    </div>
                            </div>
                            <div className="profile-friends-list">
                                <div className='friends-header'>
                                    Friends
                                </div>
                            </div>
                        </div>
                        <div className="profile-right-container">
                            <div className="posts-container">
                                <Posts
                                    currentUser={currentUser}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
        : null }  
        </>
    )
}

export default Profile;