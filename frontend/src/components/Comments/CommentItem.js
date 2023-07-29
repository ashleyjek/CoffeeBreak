import { useSelector } from 'react-redux';
import { useState } from 'react';
import CommentsForm from './CommentsForm';
import CommentMenu from './CommentMenu';
import './Comments.css';

const CommentItem = ({comment, post, allUsers}) => {
    const currentUser = useSelector(state => state.session.currentUser);
    const [openForm, setOpenForm] = useState(false);
    const firstName = allUsers[comment.authorId].firstName;
    const lastName = allUsers[comment.authorId].lastName;

    return (
        <>
        <div className="each-comment-container">
            { openForm ? (
                <CommentsForm 
                    post={post} 
                    comment={comment} 
                    formType={"Edit"}
                    openForm={openForm}
                    setOpenForm={setOpenForm}/>
            ) : (
                <div className="comment-form-closed-container">
                    <img className="each-comment-favicon"></img>
                    <div className="comment-details">
                        <p className="commenter-name">{firstName} {lastName}</p>
                        <p className="comment-body">{comment.body}</p>
                    </div>
                </div>
            )}
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