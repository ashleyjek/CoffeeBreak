import { useSelector } from 'react-redux';
import CommentItem from './CommentItem';
import CreateCommentForm from './CreateCommentForm';

const Comments = ({post, allUsers, inputRef, handleRefClick}) => {
    const comments = useSelector(state => state.entities.comments);
    const postComments = Object.values(comments).filter((comment) => comment.postId === post.id)

    return (
        <>
           {postComments.map((comment) => 
            <div className="all-comments-container">
            <div key={comment.id} 
                className="comments-show-container">
                <CommentItem 
                    post={post} 
                    comment={comment}
                    allUsers={allUsers}/>
                </div>
            </div>
           )}
            <div className="create-comment-container">
                <CreateCommentForm 
                    inputRef={inputRef}
                    handleRefClick={handleRefClick}
                    post={post}/>
            </div>                
        </>
    )

}

export default Comments;