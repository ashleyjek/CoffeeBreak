import Posts from '../Posts/Index';
import Modal from '../Modal/Modal'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import './Newsfeed.css'
import { FaCoffee, FaGithub, FaLinkedin, FaUserFriends } from 'react-icons/fa';
import { useEffect } from 'react';
import { fetchFriendships } from '../../store/friendships';
import { useDispatch } from 'react-redux';

const Newsfeed = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser);
    const modal = useSelector(state => state.ui);
    const allUsers = useSelector(state => state.entities.users);
    const friends = Object.values(useSelector(state => state.entities.friendships))

    useEffect(() => {
        dispatch(fetchFriendships());
    }, []);

    return (
        <>
            <div className="left-side-bar-container">
                <div className="newsfeed-links-container">
                    <h1 className="newsfeed-links-header">&nbsp; <FaCoffee/> &nbsp; Links</h1>
                    <a href="https://github.com/ashleyjek">
                        <div className="git-hub-link">
                        &nbsp;&nbsp;&nbsp; <i className="fa-brands fa-github fa-2xl"></i> &nbsp; GitHub
                        </div>
                    </a>
                    <a href="https://www.linkedin.com/in/ashleyjek/"><div className="linked-in-link">
                        &nbsp;&nbsp;&nbsp; <i className="fa-brands fa-linkedin fa-2xl"></i> &nbsp; LinkedIn

                        </div></a>
                    <a href="https://journease.onrender.com/">
                        <div className="journease-link">
                        &nbsp;&nbsp;<img src="https://journease-artemplv.s3.amazonaws.com/public/favicon.png"></img>&nbsp;Journease
                        </div>
                    </a>
                    <a href="https://ashleyjek.github.io/WhaleWatch/">
                        <div className="whale-watch-link">
                        &nbsp;<img src="https://coffeebook-dev.s3.amazonaws.com/whale+icon.png"></img>WhaleWatch
                        </div>
                    </a>
                </div>
            </div>
            <div className="newsfeed-container">
                <Posts
                    currentUser={currentUser}/>
            </div>
            <div className="right-side-bar-container">
                <div className="newsfeed-friends-list">
                    <h1 className="my-friends">
                        <FaUserFriends/>&nbsp; My Friends</h1>
                    <ul className="my-friends-list">
                        { friends?.map((friend) => {
                            return (
                                <a 
                                    key={friend.id}
                                    href={'/users/' + friend.friendId}>
                                    <li 
                                        className="each-friend-list-item">
                                            <img src={allUsers[friend.friendId]?.avatarSrc}></img> &nbsp;&nbsp;
                                            <p className="online-icon"/>
                                        <p>{allUsers[friend.friendId]?.firstName} {allUsers[friend.friendId]?.lastName}</p>
                                    </li>
                                </a>
                            )
                        })}
                    </ul>

                </div>
            </div>
            { modal.modal ? 
                <div className="post-form-modal-bg">
                    <Modal modal={modal.modal} post={modal.post} />
                </div> : null }
        </>
    )
}

export default Newsfeed;