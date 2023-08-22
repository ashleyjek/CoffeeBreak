import Modal from "../Modal/Modal";
import Navigation from '../Navigation/Navigation';
import PostItem from "../Posts/PostItem";
import ProfileInfo from "./ProfileInfo";
import ProfileFriendsList from "./ProfileFriendsList";
import ProfileHeader from "./ProfileHeader";
import CreatePostForm from "../Posts/CreatePostForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { fetchProfileUser } from '../../store/users'
import "../Profile/Profile.css"


const Profile = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser)
    const modal = useSelector(state => state.ui);
    const users = useSelector(state => state.entities.users);
    const user = useSelector(state => state.entities.users[userId]);
    const posts = useSelector(state => state.entities.posts);
    const friendship = useSelector(state => state.entities?.friendships[currentUser?.id]);
    const allFriends = useSelector(state => state.entities.users);
    const userPosts = Object.values(posts)?.filter(post => post.authorId === user?.id);
    const [friendStatus, setFriendStatus] = useState("");

    useEffect(() => {
        dispatch(fetchProfileUser(userId));
    }, [friendStatus]);

    useEffect(() => {
        if (friendship) {
            setFriendStatus(true);
        } else {
            setFriendStatus(false);
        }
    }, [friendship]);

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
                <ProfileHeader
                    user={user}
                    friendStatus={friendStatus}
                    setFriendStatus={setFriendStatus}
                    friendship={friendship} />
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