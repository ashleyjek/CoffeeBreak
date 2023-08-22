import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPosts } from '../../store/posts';
import { fetchUsers } from '../../store/users';
import { openModal } from '../../store/ui';
import Modal from '../Modal/Modal';
import PostItem from './PostItem';
import './Posts.css';

const Posts = () => {
    const dispatch = useDispatch();
    const userId = useParams().userId;
    const posts = useSelector(state => state.entities.posts);
    const allPosts = Object.values(posts).reverse();
    const allUsers = useSelector(state => state.entities.users);
    const currentUser = useSelector(state => state.session.currentUser);
    const modal = useSelector(state => state.entities.ui);

    useEffect(() => {
        dispatch(fetchUsers())
        .then((resp) => {
            if (resp.ok) {
                (dispatch(fetchPosts()));
            }
        });
    }, []);

    const location = useLocation().pathname;
    if (!currentUser) return null; 
    return (
        <>
        { location !== `/users/${userId}` ? 
            <div 
                id="newsfeed-create-post-container"
                className="create-post-container">
            <a href={'/users/' + currentUser.id}>
                <img 
                    src={allUsers[currentUser.id]?.avatarSrc}
                    className="create-post-profile-icon"></img>
            </a>
                <input 
                    className="create-post-input"
                    placeholder={`What's on your mind, ${currentUser.firstName}?`}
                    onClick={() => dispatch(openModal("create-post"))}/>
            </div>
        : null 
        }

        {allPosts.map((post) => {
            return (
                <PostItem 
                key={post.id}
                post={post} 
                allUsers={allUsers} />
            )})
        }

        { modal ? <Modal/> : null }
        </>
    )
}

export default Posts;