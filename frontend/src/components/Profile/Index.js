import Modal from "../Modal/Modal";
import Navigation from '../Navigation/index';
import Posts from "../Posts/index";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchProfileUser } from '../../store/users'
import { useEffect, useState } from "react";
import { openModal } from "../../store/ui";
import { FaBirthdayCake, FaCamera, FaMailBulk, FaPencilAlt, FaPersonBooth, FaUser } from "react-icons/fa";
import { removeFriend, createFriend } from "../../store/friendships";
import "../Profile/Profile.css"
import PostItem from "../Posts/PostItem";

const Profile = () => {
    const currentUser = useSelector(state => state.session.currentUser)
    const dispatch = useDispatch();
    const { userId } = useParams();
    const modal = useSelector(state => state.ui);
    const user = useSelector(state => state.entities.users[userId])
    const friendship = useSelector(state => state.entities.friendships[currentUser.id]);
    const users = useSelector(state => state.entities.users);
    const [friendStatus, setFriendStatus] = useState("");
    const friendIds = Object.keys(useSelector(state => state.entities.friendships));
    const posts = useSelector(state => state.entities.posts)
    const allPosts = Object.values(posts).reverse();

    const allFriends = useSelector(state => state.entities.users)

    useEffect(() => {
        dispatch(fetchProfileUser(userId));
         //fetch user friends method?
    }, [])

    useEffect(() => {
        if (friendship && friendship.id) {
            setFriendStatus(true)
        } else {
            setFriendStatus(false)
        } 
    }, [users, setFriendStatus])

    const removeFriendHandler = () => {
        dispatch(removeFriend(friendship.id));
        setFriendStatus(false);
    }
    
    const addFriendHandler = () => {
        dispatch(createFriend({
            friend_id: userId
        }));
        setFriendStatus(true);
    }
 
    // else {
        //check if request not yet accepted
    // }
    



    return (
        <>
        { user ?
        <>
            { modal.modal ? 
                <div className="post-form-modal-bg">
                    <Modal 
                        modal={modal.modal}
                        post={modal.post} 
                        user={modal.user} />
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
                                { currentUser.id == userId ? 
                                // <label className="add-cover-photo-label"> 
                                <button 
                                    onClick={() => dispatch(openModal("update-cover", null, null, currentUser))}
                                    className="add-cover-photo">
                                            <FaCamera/> Add cover photo
                                    </button> : null }
                                {/* </label>  */}
                            </div>
                        </div>
                        <div className="profile-header-container">
                            <div className="profile-photo-container">
                                {user?.avatarSrc ? 
                                    <img src={user.avatarSrc} className="profile-photo"></img>
                                    : null }
                                { currentUser.id == userId ? 
                                    <button
                                        onClick={() => dispatch(openModal("update-avatar", null, null, currentUser))} 
                                        className="profile-photo-cam-button">
                                        <FaCamera/> 
                                    </button> : null }
                            </div>
                            <div className="profile-header-name-container">
                                <p className="profile-name-header">
                                    {user.firstName} {user.lastName}
                                </p>
                            </div>
                            <div className="profile-buttons">
                                { currentUser.id == userId ? 
                                    <div className="profile-edit-button-container">
                                        <button className="profile-edit-button">
                                        <FaPencilAlt/> Edit profile
                                        </button>
                                    </div>
                                :   <div className="friend-button">
                                        {friendStatus ? 
                                        <button 
                                        onClick={removeFriendHandler}
                                        className="remove-friend"> Remove Friend </button>
                                        :
                                        <button 
                                            onClick={addFriendHandler}
                                            className="add-friend"> <FaUser/> Add Friend </button>
                                        }
                                    </div>                   
                                }
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
                                <div className="friends-list-links">
                                    <ul className="friends-list">
                                     { friendIds.map((friendId) => {
                                        return (
                                            <li className="each-friend-container">
                                                <a href={'/users/' + friendId}><img src={users[friendId]?.avatarSrc}/></a>
                                                <h1>{users[friendId]?.firstName} {users[friendId]?.lastName}</h1>
                                            </li>
                                        )
                                     })}

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="profile-right-container">
                            <div className="posts-container">
                                { friendStatus ? 
                                <div className="create-post-container">
                                    <a href={'/users/' + currentUser.id}>
                                        <img 
                                            src={currentUser?.avatarSrc}
                                            className="create-post-profile-icon"></img>
                                    </a>
                                        <input 
                                            className="create-post-input"
                                            placeholder={`What's on your mind?`}
                                            onClick={() => dispatch(openModal("create-post"))}/>
                                </div>
                                : null }
                                { allPosts.map((post) => {
                                    return (<PostItem
                                                post={post}
                                                allUsers={allFriends}
                                                />)
                                })}
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