import Posts from '../Posts/index';
import Modal from '../Modal/Modal'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import './Newsfeed.css'

const Newsfeed = () => {
    // const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const currentUser = useSelector(state => state.session.currentUser);
    const modal = useSelector(state => state.ui);

    return (
        <>
            <div className="left-side-bar-container"></div>
            <div className="newsfeed-container">
                <Posts
                    currentUser={currentUser}/>
            </div>
            <div className="right-side-bar-container"></div>
            { modal.modal ? 
                <div className="post-form-modal-bg">
                    <Modal modal={modal.modal} post={modal.post} />
                </div> : null }
        </>
    )
}

export default Newsfeed;