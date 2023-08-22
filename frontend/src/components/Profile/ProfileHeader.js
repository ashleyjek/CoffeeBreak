import { useSelector } from "react-redux";
import { openModal } from "../../store/ui";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { removeFriend, createFriend } from "../../store/friendships";
import { FaCamera, FaPencilAlt, FaUser } from "react-icons/fa";

const ProfileHeader = (props) => {
    const { user, friendStatus, setFriendStatus, friendship } = props;
    const { userId } = useParams();
    const currentUser = useSelector(state => state.session.currentUser);
    const dispatch = useDispatch();

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

    return (
        <div className="profile-header-bg">
            <div className="user-profile-container">
                <div className="cover-photo-gradient-container">
                    <div className="cover-photo-container">
                        <img src={user.coverSrc}></img>
                        </div>
                    <div className="cover-photo-buttons-container">
                        { currentUser?.id == userId && 
                            <button 
                                onClick={() => 
                                    dispatch(openModal(
                                        "update-cover", 
                                        null, 
                                        null, 
                                        currentUser
                                    ))}
                                className="add-cover-photo">
                                    <FaCamera/> Add cover photo
                            </button> 
                        }
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
                                onClick={() => 
                                        dispatch(openModal(
                                            "update-avatar", 
                                            null, 
                                            null, 
                                            currentUser
                                        ))} 
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
                                    onClick={()=> 
                                            dispatch(openModal(
                                                "edit-profile"
                                            ))}
                                    className="profile-edit-button">
                                        <FaPencilAlt/> Edit profile bio
                                </button>
                            </div> 
                            :   
                            <div className="friend-button">
                                {friendStatus ? 
                                    <button 
                                        onClick={removeFriendHandler}
                                        className="remove-friend"> 
                                            Remove Friend 
                                    </button>
                                :
                                    <button 
                                        onClick={addFriendHandler}
                                        className="add-friend"> 
                                            <FaUser/> Add Friend 
                                    </button>
                                }
                            </div>                   
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader;