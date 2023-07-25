import { useDispatch, useSelector } from 'react-redux';
import NewPostForm from './NewPostForm';
import './Posts.css';
import { getPosts } from '../../store/posts';
import { useEffect } from 'react';
import { fetchPosts } from '../../store/posts';
import { deletePost } from '../../store/posts';

const Posts = ({currentUser}) => {
    const allPosts = useSelector(getPosts);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchPosts())
    }, []);
    
    if (!currentUser) return null;
    // debugger;

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
    <NewPostForm />
            {allPosts.map((post) => 
            <div key={post?.id} className="post-container">
                {/* post container */}
                <div className="post-header-container">
                    {/* * post-header-container */}
                    <div className="post-profile-icon"> 
                        ** post-profile-icon
                    </div>
                    <div className="post-details-container">
                        ** post-details-container
                        <div className="post-author">*** post-author</div>
                        <div className="post-date-time">*** post-date-time</div>
                    </div>
                    <div className="post-edit-button">** post-edit-button
                    { currentUser.id === post.authorId ? (
                        <button onClick={() => dispatch(deletePost(post?.id))}/>
                    ) : null }
                    </div>
                    <div className="post-close-button">** post-close-button</div>
                </div>
                <div className="post-body-container">
                    * post-body-container
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