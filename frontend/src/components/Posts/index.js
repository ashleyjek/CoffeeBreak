import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPosts } from '../../store/posts';
import { fetchUsers } from '../../store/users';
import { openModal } from '../../store/ui';
import PostItem from './PostItem';
import Modal from '../Modal/Modal'
import './Posts.css';

const Posts = ({currentUser}) => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.entities.posts);
    const allPosts = Object.values(posts).reverse();
    const allUsers = useSelector(state => state.entities.users);
    const modal = useSelector(state => state.ui);

    useEffect(() => {
        dispatch(fetchUsers())
        .then((resp) => {
            if (resp.ok) {
                (dispatch(fetchPosts()));
            }
        });
    }, []);

    
    return (
        <>
            <div className="create-post-container">
                <img 
                    alt="profile-favicon" 
                    className="create-post-profile-icon"></img>
                <input 
                    className="create-post-input"
                    placeholder={`What's on your mind, ${currentUser.firstName}?`}
                    onClick={() => dispatch(openModal("create-post"))}/>
            </div>

            {allPosts.map((post) => {
                return (
                    <PostItem 
                    key={post.id}
                    post={post} 
                    allUsers={allUsers} />
                    )})
                }
            { modal.modal ? 
                <div className="post-form-modal-bg">
                <Modal modal={modal.modal} post={modal.post} />
                </div> : null }
        </>
    )
}

export default Posts;