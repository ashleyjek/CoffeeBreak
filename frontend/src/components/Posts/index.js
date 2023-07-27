import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/posts';
import { useEffect } from 'react';
import { fetchPosts } from '../../store/posts';
import { fetchUsers } from '../../store/users';
import { openModal } from '../../store/ui';
import PostItem from './PostItem';
import './Posts.css';

const Posts = ({currentUser}) => {
    // debugger
    const dispatch = useDispatch();
    const posts = useSelector(getPosts);
    const allPosts = Object.values(posts).reverse();
    const allUsers = useSelector(state => state.entities.users);

    useEffect(() => {
        dispatch(fetchUsers())
        .then((resp) => {
            if (resp.ok) {
                (dispatch(fetchPosts()));
            }
        });
    }, []);
    
    // if (!currentUser) return null;
    
    return (
        <>
            <div className="create-post-container">
                <img 
                    alt="profile-favicon" 
                    className="create-post-profile-icon"></img>
            { currentUser && (
                <input 
                    className="create-post-input"
                    placeholder={`What's on your mind, ${currentUser.firstName}?`}
                    onClick={() => {dispatch(openModal("Create"))}}/>
                    )}
            </div>

            {allPosts.map((post) => 
                <PostItem 
                    key={post.id}
                    post={post} 
                    allUsers={allUsers} />
                    )}
        </>
    )
}

export default Posts;