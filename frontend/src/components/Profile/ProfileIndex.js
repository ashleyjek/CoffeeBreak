import Modal from "../Modal/Modal";
import Navigation from '../Navigation/Navigation';
import PostItem from "../Posts/PostItem";
import ProfileInfo from "./ProfileInfo";
import ProfileFriendsList from "./ProfileFriendsList";
import CreatePostForm from "../Posts/CreatePostForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { openModal } from "../../store/ui";
import { fetchProfileUser } from '../../store/users'
import { removeFriend, createFriend } from "../../store/friendships";
import { FaCamera, FaPencilAlt, FaUser } from "react-icons/fa";
import "../Profile/Profile.css"


const Profile = () => {
    const currentUser = useSelector(state => state.session.currentUser)
    const dispatch = useDispatch();
    const { userId } = useParams();
    const modal = useSelector(state => state.ui);
    const users = useSelector(state => state.entities.users);
    const user = useSelector(state => state.entities.users[userId])
    const friendship = useSelector(state => state.entities?.friendships[currentUser?.id]);
    const posts = useSelector(state => state.entities.posts);
    const userPosts = Object.values(posts)?.filter(post => post.authorId === user?.id);
    const [friendStatus, setFriendStatus] = useState("");
    const allFriends = useSelector(state => state.entities.users)

    useEffect(() => {
        dispatch(fetchProfileUser(userId));
    }, [friendStatus])

    useEffect(() => {
        if (friendship) {
            setFriendStatus(true)
        } else {
            setFriendStatus(false)
        }
    }, [friendship])

    const removeFriendHandler = () => {
        dispatch(removeFriend(friendship.id))
        .then((resp) => {
            if (resp.ok) {
                setFriendStatus(false);
            }
        });
    };
    
    const addFriendHandler = () => {
        dispatch(createFriend({
            friend_id: userId
        })).then((resp) => {
            if (resp.ok) {
                setFriendStatus(true);
            }
        });
    };
 
    // else {
        //check if request not yet accepted
    // }

    if (!currentUser) return null;
    
    return (
        <>
        { user &&
        <>
            { modal.modal && 
            <div className="showpage-modal-bg">
                <Modal 
                    modal={modal.modal}
                    post={modal.post} 
                    user={modal.user} />
            </div>
            }
            <Navigation />
            <div className="user-profile-bg">
                <div className="profile-header-bg">
                    <div className="user-profile-container">
                        <div className="cover-photo-gradient-container">
                            <div className="cover-photo-container">
                                <img src={user.coverSrc}></img>
                            </div>
                            <div className="cover-photo-buttons-container">
                                { currentUser?.id == userId && 
                                <button 
                                    onClick={() => dispatch(openModal(
                                                        "update-cover", 
                                                        null, 
                                                        null, 
                                                        currentUser))}
                                    className="add-cover-photo">
                                        <FaCamera/> Add cover photo
                                    </button> }
                            </div>
                        </div>
                        <div className="profile-header-container">
                            <div className="profile-photo-container">
                                { user?.avatarSrc && 
                                    <img 
                                        src={user?.avatarSrc} 
                                        className="profile-photo"/>
                                    }
                                { currentUser.id == userId &&
                                    <button
                                        onClick={() => dispatch(openModal(
                                                            "update-avatar", 
                                                            null, 
                                                            null, 
                                                            currentUser))} 
                                        className="profile-photo-cam-button">
                                        <FaCamera/> 
                                    </button> 
                                    }
                            </div>
                            <div className="profile-header-name-container">
                                <p className="profile-name-header">
                                    {user.firstName}&nbsp;
                                    {user.lastName}
                                </p>
                            </div>
                            <div className="profile-buttons">
                                { currentUser.id == userId ? 
                                    <div className="profile-edit-button-container">
                                        <button 
                                            onClick={()=> dispatch(openModal("edit-profile"))}
                                            className="profile-edit-button">
                                        <FaPencilAlt/> Edit profile bio
                                        </button>
                                    </div> :   
                                    <div className="friend-button">
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
                            <ProfileInfo user={user}/>
                            <ProfileFriendsList/>
                        </div>
                        <div className="profile-right-container">
                            <div className="posts-container">
                                { friendStatus || currentUser.id == userId &&
                                    <CreatePostForm 
                                        currentUser={currentUser}
                                        users={users}/>
                                }
                                { userPosts.reverse().map((post) => {
                                    return (
                                        <PostItem
                                            key={post.id}
                                            post={post}
                                            allUsers={allFriends}
                                            />
                                        )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
        }  
        </>
    )
}

export default Profile;