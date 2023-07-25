import { useDispatch, useSelector } from 'react-redux';
import PostForm from './PostForm';
import './Posts.css';
import { getPosts } from '../../store/posts';
import { useEffect } from 'react';
import { fetchPosts } from '../../store/posts';
import { fetchUsers, fetchUser } from '../../store/users';
import { deletePost } from '../../store/posts';
import { getUsers } from '../../store/users';

const Posts = ({currentUser}) => {
    const allPosts = useSelector(getPosts);
    const allUsers = useSelector(state => state.entities.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchPosts());
    }, []);
    console.log(allUsers)

    
    if (!currentUser) return null;

    return (
        <>
            <div className="create-post-container">
                <img alt="profile-favicon" className="create-post-profile-icon"></img>
                { currentUser && (
                <input 
                    className="create-post-input"
                        placeholder={`What's on your mind, ${currentUser.firstName}?`}/>
                    )}
            </div>
    <PostForm />
            {allPosts.map((post) => 
            <div key={post?.id} className="post-container">
                {/* post container */}
                <div className="post-header-container">
                    {/* * post-header-container */}
                    <div className="post-profile-icon"> 
                        icon
                    </div>
                    <div className="post-details-container">
                        {/* ** post-details-container */}
                        <div className="post-author">AUTHOR NAME</div>
                        <div className="post-date-time">date</div>
                    </div>
                    <div className="post-edit-button">edit
        
                    </div>
                    { currentUser.id === post.authorId ? (
                        <button onClick={() => {dispatch(deletePost(post.id))}} >Delete</button>
                    ) : null }
                    {/* <div className="post-close-button">close</div> */}
                </div>
                <div className="post-body-container">
                    {/* * post-body-container */}
                    <div className="post-body-text">
                        {/* ** post-body-text */}
                        {post.body}
                    </div>
                </div>
                <div className="post-photo-container">
                    * post-photo-container
                    <div className="post-photo-source">
                        ** post-photo-source
                    </div>
                </div>
                <div className="posts-cmts-ctr-container">
                    * posts-cmts-ctr-container
                    <div className="likes-count">
                        ** like-count
                    </div>
                    <div className="comments-count">
                        ** comments-count
                    </div>
                </div>
                <div className="post-reaction-container">
                    * post-reaction-container
                    <div className="like-button"/>
                        ** like-button
                    <div className="comment-button"/>
                        ** comment-button
                </div>
                <div className="comments-container">
                    COMMENTS COMPONENT
                </div>
            </div>)}
        </>
    )
}

export default Posts;