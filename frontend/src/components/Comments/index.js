import { useSelector } from 'react-redux';
import CommentItem from './CommentItem';
import CommentsForm from './CommentsForm.js';

const Comments = ({post}) => {
    const comments = useSelector(state => state.entities.comments);
    const allComments = Object.values(comments).filter((comment) => comment.postId === post.id)

    return (
        <>
           {allComments.map((comment) => 
                <div className="comments-container">
                    <div
                        key={comment.id} 
                        className="comments-show-container">
                    <CommentItem 
                        post={post} 
                        comment={comment}/>
                        </div>
                    </div>
           )}
            <div
                className="comments-form-container">
                <CommentsForm 
                    post={post}/>
                </div>
        </>
    )

}

export default Comments;