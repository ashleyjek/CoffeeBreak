import { useSelector } from 'react-redux';
import CommentItem from './CommentItem';

const Comments = ({post, allUsers}) => {
    const comments = useSelector(state => state.entities.comments);
    const allComments = Object.values(comments).filter((comment) => comment.postId === post.id)

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
        </>
    )

}

export default Comments;