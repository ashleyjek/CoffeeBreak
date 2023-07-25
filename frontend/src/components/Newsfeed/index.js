import { useSelector } from 'react-redux';
import Posts from '../Posts/index';
import './Newsfeed.css'

const Newsfeed = () => {
    const currentUser = useSelector(state => state.entities.users[state.session.currentUser]);

    return (
        <>
            <div className="left-side-bar-container"> 
            </div>
            <div className="newsfeed-container">
                <Posts currentUser={currentUser}/>
            </div>
            <div className="right-side-bar-container">

            </div>
        </>
    )
}

export default Newsfeed;