import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteLike, createLike } from '../../store/likes';
import { FaThumbsUp } from 'react-icons/fa';
import moment from 'moment-timezone';
import PostsIndexHeader from './PostsIndexHeader';
import Comments from '../Comments';
import './Posts.css';

const PostItem = ({post, allUsers}) => {
    const dispatch = useDispatch();
    const inputRef = useRef();
    const currentUser = useSelector(state => state.session.currentUser)
    const allLikes = useSelector(state => state.entities.likes);
    const postLikes = post.likes?.length;
    const [likeId, setLikeId] = useState(null);
    const [numLikes, setNumLikes] = useState(postLikes);
    const [liked, setLiked] = useState(null);
    const [timeStamp, setTimeStamp] = useState("");

    let eachLikeId;
    useEffect(() => {
        for (let i = 0; i < post.likes?.length; i ++) {
            eachLikeId = post.likes[i];
            if (allLikes[eachLikeId].likerId === currentUser.id) {
                setLikeId(eachLikeId)
                setLiked(true);
                break; 
            } else {
                setLiked(false);
            }
        }
        setTimeStamp(moment(post.createdAt).format('MMMM d [at] h:MM A ·'))
    }, [post]);

    const handleRefClick = () => {
        inputRef.current.focus();
        inputRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    const handleLike = (e) => {
        e.preventDefault();
        if (!liked) {
            dispatch(createLike({
                likeableType: "Post",
                likeableId: post.id
            })).then((resp) => { if (resp.ok) {
                setLiked(true);
                setNumLikes(numLikes + 1);

            }})
        } else {
            dispatch(deleteLike(allLikes[likeId]))
            .then((resp) => { if (resp.ok) {
                setLiked(false);
                setNumLikes(numLikes - 1);
            }})
        }
    }
    
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
                            {allUsers[post?.authorId].firstName} &nbsp;
                            {allUsers[post?.authorId].lastName}
                            </div>
                        <div className="post-date-time">
                            {timeStamp}&nbsp;<i class="fa-solid fa-earth-americas"></i></div>
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
                    <div className="posts-counts-container">
                        <div className="likes-count">
                            { postLikes ?
                            <>
                                <FaThumbsUp/> &nbsp; {postLikes}
                            </>
                            : null }
                        </div>
                        <div className="comments-count"></div>
                    </div>
                    <div className="post-reaction-container">
                    { liked ? <button 
                            onClick={handleLike}
                            className="liked-button">
                                <FaThumbsUp/> &nbsp; Like</button>
                       : <button 
                            onClick={handleLike}
                            className="not-liked-button">
                                <FaThumbsUp/> &nbsp; Like</button>
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