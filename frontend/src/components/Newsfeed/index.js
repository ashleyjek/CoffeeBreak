import Posts from '../Posts/index';
import Modal from '../Modal/Modal'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import './Newsfeed.css'
import { FaCoffee, FaGithub, FaLinkedin, FaUserFriends } from 'react-icons/fa';

const Newsfeed = () => {
    // const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const currentUser = useSelector(state => state.session.currentUser);
    const modal = useSelector(state => state.ui);
    const allUsers = useSelector(state => state.entities.users);
    const friendIds = useSelector(state => state.entities.users[currentUser?.id]?.friends);

    return (
        <>
            <div className="left-side-bar-container">
                <div className="newsfeed-links-container">
                    <h1 className="newsfeed-links-header">&nbsp; <FaCoffee/> &nbsp; Links</h1>
                    <a href="https://github.com/ashleyjek">
                        <div className="git-hub-link">
                        &nbsp;&nbsp;&nbsp; <i class="fa-brands fa-github fa-2xl"></i> &nbsp; GitHub
                        </div>
                    </a>
                    <a href="https://www.linkedin.com/in/ashleyjek/"><div className="linked-in-link">
                        &nbsp;&nbsp;&nbsp; <i class="fa-brands fa-linkedin fa-2xl"></i> &nbsp; LinkedIn

                        </div></a>
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