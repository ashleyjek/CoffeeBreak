import Posts from '../Posts/index';
import Modal from '../Modal/Modal'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import './Newsfeed.css'
import { FaCoffee, FaGithub, FaLinkedin, FaUserFriends } from 'react-icons/fa';

const Newsfeed = () => {
    // const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const currentUser = useSelector(state => state.session.currentUser);
    const modal = useSelector(state => state.ui);
    const friendIds = useSelector(state => state.entities.users[currentUser.id]?.friends);
    const allUsers = useSelector(state => state.entities.users);

    return (
        <>
            <div className="left-side-bar-container">
                <div className="newsfeed-links-container">
                    <h1 className="newsfeed-links-header">&nbsp; <FaCoffee/> &nbsp; Links</h1>
                    <a href="https://github.com/ashleyjek">
                        <div className="git-hub-link">
                        &nbsp; <FaGithub/> &nbsp; GitHub
                        </div>
                    </a>
                    <a><div className="linked-in-link">
                        &nbsp; <FaLinkedin/> &nbsp; LinkedIn

                        </div></a>
                    <a href="https://ashleyjek.github.io/WhaleWatch/">
                        <div className="whale-watch-link">
                        &nbsp;  <img id="whale" src="https://live.staticflickr.com/65535/53091026922_3fc0d23eda_m.jpg"/>WhaleWatch
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
                        { friendIds?.map((friendId) => {
                            return (
                                <a href={'/users/' + friendId}>
                                    <li className="each-friend-list-item">
                                            <img src={allUsers[friendId]?.avatarSrc}></img> &nbsp;&nbsp;
                                            <p className="online-icon"/>
                                        <p>{allUsers[friendId]?.firstName} {allUsers[friendId]?.lastName}</p>
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