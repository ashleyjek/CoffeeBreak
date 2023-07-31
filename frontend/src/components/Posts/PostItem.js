import { useSelector } from 'react-redux';
import Comments from '../Comments';
import PostsIndexHeader from './PostsIndexHeader';
import { useRef } from 'react';

import './Posts.css';

const PostItem = ({post, allUsers}) => {
    const currentUser = useSelector(state => state.session.currentUser)
    const inputRef = useRef();

    const handleRefClick = () => {
        inputRef.current.focus();
        inputRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
    return (
            <>
            <div key={post?.id} className="post-container">
                <PostsIndexHeader 
                    currentUser={currentUser} 
                    post={post}/>

                <div className="post-header-container">
                    <a href={'/users/' + post.authorId}>
                        <img className="post-profile-icon"></img>
                    </a>
                    <div className="post-details-container">
                        <div className="post-author">
                            {allUsers[post?.authorId].firstName} {allUsers[post?.authorId].lastName}
                            </div>
                        <div className="post-date-time">
                            {post.createdAt}</div>
                        </div>
                    </div>
                    <div className="post-body-container">
                        <div className="post-body-text">
                            {post?.body}
                        </div>
                    </div>
                    {post?.photoSrc ? (
                    <div className="post-photo-bg">
                        <div className="post-photo-container">
                            <div className="post-photo-source">
                                <img src={post?.photoSrc}/>
                            </div>
                        </div>
                    </div> ) : null }
                    {/* <div className="posts-cmts-ctr-container">
                        <div className="likes-count"></div>
                        <div className="comments-count"></div>
                    </div> */}
                    <div className="post-reaction-container">
                        <button 
                            className="like-button">
                                Like</button>
                        <button 
                            className="create-comment-main-button" 
                            onClick={handleRefClick}>
                                Comment</button>
                    </div>
                    <div className="entire-comments-container">
                        <Comments 
                            post={post} 
                            allUsers={allUsers}
                            inputRef={inputRef}
                            handleRefClick={handleRefClick}/>
                    </div>
                </div>
    
            </>
        )
}

export default PostItem;