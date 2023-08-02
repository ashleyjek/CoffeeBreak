import { useSelector } from 'react-redux';
import Comments from '../Comments';
import PostsIndexHeader from './PostsIndexHeader';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteLike, createLike } from '../../store/likes';
import './Posts.css';

const PostItem = ({post, allUsers}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser)
    const inputRef = useRef();
    // const [likeButtonClass, setLikeButtonClass] = useState("");
    const allLikes = useSelector(state => state.entities.likes);
    const postLikes = post.likes.length;
    const [numLikes, setNumLikes] = useState(postLikes);
    const [liked, setLiked] = useState("");

    const handleRefClick = () => {
        inputRef.current.focus();
        inputRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    useEffect(() => {
        if (post.likes.includes(currentUser.id)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [allLikes, numLikes]) 

    const handleLike = (e) => {
        e.preventDefault();
        if (liked === true) {
            dispatch(deleteLike(allLikes[currentUser.id].id))
            setNumLikes(numLikes - 1);
        } else {
            dispatch(createLike({
                likerId: currentUser.id,
                likeableType: "Post",
                likeableId: post.id
            }));
            setNumLikes(numLikes + 1)
        };
    };

    
    return (
            <>
            <div key={post?.id} className="post-container">
                <PostsIndexHeader 
                    currentUser={currentUser} 
                    post={post}/>

                <div className="post-header-container">
                    <a href={'/users/' + post.authorId}>
                        <img 
                            src={allUsers[post.authorId]?.avatarSrc} 
                            className="post-profile-icon"></img>
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
                    { liked ? <button 
                            // className={likeButtonClass}
                            onClick={handleLike}
                            className="liked-button">
                                Like</button>
                       : <button 
                            // className={likeButtonClass}
                            onClick={handleLike}
                            className="not-liked-button">
                                Like</button>
                               }
                        <button 
                            className="create-comment-main-button" 
                            onClick={handleRefClick}>
                                Comment</button>
                    </div>
                    <div className="entire-comments-container">
                        <Comments 
                            currentUser={currentUser}
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