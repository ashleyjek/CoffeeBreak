import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import EditCommentForm from './EditCommentForm';
import CommentMenu from './CommentMenu';
import './Comments.css';
import { createLike, deleteLike } from '../../store/likes';

const CommentItem = ({comment, post, allUsers}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser);
    const [openForm, setOpenForm] = useState(false);
    const firstName = allUsers[comment.authorId].firstName;
    const lastName = allUsers[comment.authorId].lastName;
    const allLikes = useSelector(state => state.entities.likes);
    const commentLikes = comment?.likes?.length;
    const [liked, setLiked] = useState("");
    const [likeId, setLikeId] = useState(null);

    useEffect(() => {
        comment.likes?.forEach((likeId) => {
            debugger
            if (allLikes[likeId]?.likerId === currentUser.id) {
                setLikeId(likeId)
                setLiked(true);
            } else {
                setLiked(false);
            }
        });
    }, [commentLikes]);
    // debugger
    // const commentLikes = 
    // const [liked, setLiked] = useState("");

    // const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    // const buttonColor = 
    const handleLike = (e) => {
        e.preventDefault();
        if (!liked) {
            debugger
            dispatch(createLike({
                likeableType: "Comment",
                likeableId: comment.id
            })).then((resp) => { if (resp.ok) {
                setLiked(true);
            }})
        } else {
            dispatch(deleteLike(allLikes[likeId]))
            .then((resp) => { if (resp.ok) {
                setLiked(false);
            }})
        }
    }
    return (
        <>
        <div className="each-comment-container">
            <div className="comment-form-closed-container">
            <a href={'/users/' + comment.authorId}>
                    <img 
                        src={allUsers[comment.authorId]?.avatarSrc} 
                        className="each-comment-avatar"></img>
            </a>
                { openForm ? (
                <EditCommentForm 
                    post={post} 
                    comment={comment} 
                    formType={"Edit"}
                    openForm={openForm}
                    setOpenForm={setOpenForm}/>
            ) : (
                    <div className="comment-details">
                        <p className="commenter-name">{firstName} {lastName}</p>
                        <p className="comment-body">{comment.body}</p>
                    </div>
            )} 
                <div className="comment-like-button">
                    { liked ? 
                        <button 
                            className="comment-liked"
                            onClick={handleLike}
                            >Like</button> :
                        <button 
                            className="comment-not-liked"
                            onClick={handleLike}
                            >Like</button>    
                    }
                </div>
            </div>
            { comment.authorId === currentUser.id ? (
                <CommentMenu 
                    comment={comment} 
                    openForm={openForm} 
                    setOpenForm={setOpenForm}
                    />
            ) : null }
        </div>     
        </>
    )
}

export default CommentItem;