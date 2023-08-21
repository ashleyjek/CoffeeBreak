import { useSelector } from "react-redux";

const ProfileFriendsList = () => {
    const friendIds = Object.keys(useSelector(state => state.entities.friendships));
    const users = useSelector(state => state.entities.users);

    return (
        <div className="profile-friends-list">
        <div className='friends-header'>
            Friends
        </div>
        <div className="friends-list-links">
            <ul className="friends-list">
             { friendIds.map((friendId) => {
                return (
                    <li 
                        key={friendId}
                        className="each-friend-container">
                        <a 
                            id="friend-links-nf" 
                            href={'/users/' + friendId}>
                            <img 
                                src={users[friendId]?.avatarSrc}/>
                        </a>
                        <h1>{users[friendId]?.firstName} &nbsp;
                            {users[friendId]?.lastName}</h1>
                    </li>
                )
             })}

            </ul>
        </div>
    </div>
    )
}

export default ProfileFriendsList;