import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/ui";
import { deletePost } from "../../store/posts";

const DeletePostModal = () => {
    const post = useSelector(state => state.ui.post);
    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(deletePost(post.id));
        dispatch(closeModal());
    }
    return (
        <div className="delete-post-bg"
             onClick={() => dispatch(closeModal())}>
            <div className="delete-post-container">
                <div className="delete-post-header">
                    Delete Post?
                    <button
                        onClick={() => dispatch(closeModal())} 
                        className="delete-close-button">x</button>
                </div>
                <div className="delete-post-body-container">
                    <div className="delete-post-body">
                        Are you sure you want to delete this post?
                    </div>
                    <div className="delete-post-buttons">
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

export default DeletePostModal;