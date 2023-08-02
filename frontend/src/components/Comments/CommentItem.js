import { useSelector } from 'react-redux';
import { useState } from 'react';
import EditCommentForm from './EditCommentForm';
import CommentMenu from './CommentMenu';
import './Comments.css';

const CommentItem = ({comment, post, allUsers}) => {
    const currentUser = useSelector(state => state.session.currentUser);
    const [openForm, setOpenForm] = useState(false);
    const firstName = allUsers[comment.authorId].firstName;
    const lastName = allUsers[comment.authorId].lastName;
    // const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

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