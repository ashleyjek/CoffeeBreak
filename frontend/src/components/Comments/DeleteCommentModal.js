import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/ui";
import { deleteComment } from "../../store/comments"

const DeleteCommentModal = () => {
    const comment = useSelector(state => state.ui.comment);
    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(deleteComment(comment.id));
        dispatch(closeModal());
    }
    return (
        <div className="delete-comment-bg"
             onClick={() => dispatch(closeModal())}>
            <div className="delete-comment-container">
                <div className="delete-comment-header">
                    Delete Comment?
                    <button
                        onClick={() => dispatch(closeModal())} 
                        className="delete-close-button">x</button>
                </div>
                <div className="delete-comment-body-container">
                    <div className="delete-comment-body">
                        Are you sure you want to delete this comment?
                    </div>
                    <div className="delete-comment-buttons">
                        <button className="cancel-delete-button"> No </button>
                        <button 
                            className="delete-confirm-button"
                            onClick={handleSubmit}>
                                Delete
                            </button>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default DeleteCommentModal;