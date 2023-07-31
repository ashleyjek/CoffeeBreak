import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Navigation from '../Navigation/index';
import { fetchProfileUser } from '../../store/users'
import { useEffect } from "react";
import Posts from "../Posts/index";
import Modal from "../Modal/Modal";
import "../Profile/Profile.css"

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
            <div className="user-profile-container">
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
                        {/* {allPosts.map((post) => {

                            <PostItem post={post} allUsers={allUsers}/>
                        })} */}
                        <Posts currentUser={currentUser}/>
                    </div>
                </div>
            </div>
            
        </>
        : null }  
        </>
    )
}

export default Profile;