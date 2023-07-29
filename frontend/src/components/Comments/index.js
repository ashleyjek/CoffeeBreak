import { useSelector } from 'react-redux';
import CommentItem from './CommentItem';
import { useState } from 'react';
import CommentsForm from './CommentsForm';

const Comments = ({post, allUsers}) => {
    const comments = useSelector(state => state.entities.comments);
    const allComments = Object.values(comments).filter((comment) => comment.postId === post.id)
    const [commentForm, setCommentForm] = useState(false);

    return (
        <>
           {allComments.map((comment) => 
                <div className="all-comments-container">
                <div
                    key={comment.id} 
                    className="comments-show-container">
                <CommentItem 
                    post={post} 
                    comment={comment}
                    allUsers={allUsers}/>
                    </div>
                </div>
           )}
            {/* { !commentForm ?  */}
                    <div className="create-comment-container">
                        <CommentsForm post={post} openForm={true} formType={"Create"} setOpenForm={()=>{}}/>
                    </div>
                    {/* :  */}
                    {/* <div className="create-comment-container">
                        <div className="comment-input-placeholder">
                            <img className="comments-favicon">
                            profile img goes here
                            </img>
                            <button 
                                className="comment-input-container"
                                onClick={() => setCommentForm(!commentForm)}>
                                    Write a comment...
                                </button> 
                                </div>
                        </div>  */}
                    {/* }  */}
                             

        </>
    )

}

export default Comments;