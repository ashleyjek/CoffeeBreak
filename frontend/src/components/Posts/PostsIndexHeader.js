import { useDispatch } from 'react-redux';
import { openModal } from '../../store/ui';
import { deletePost } from '../../store/posts';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import OutsideAlerter from '../util/OutsideAlerter';

const PostItemHeader = ({currentUser, post}) => {
    const dispatch = useDispatch();
    const { ref, handleClickInside, clickedOutside } = OutsideAlerter();

    const editClickHandler = (post) => {
        dispatch(openModal("edit-post", post));
    }

    const deleteClickHandler = (postId) => {
        dispatch(deletePost(postId))
    }

    return (
        <>
        { currentUser.id === post.authorId ? (
        <div className="options-button-container">
            <button 
                ref={ref}
                onClick={handleClickInside}
                className="open-options-button">
                    ...</button>
            {!clickedOutside ? 
            <div className="options-menu">
                <button 
                    className="edit-post-button" 
                    onClick={() => editClickHandler(post)}>
                        <FaPencilAlt />
                        Edit post</button>
                <button 
                    className="delete-post-button" 
                    onClick={() => deleteClickHandler(post.id)}> 
                        <FaRegTrashAlt/> 
                        Move to trash</button>
            </div> : null }
        </div> ) : null }
        </>
    )
}

export default PostItemHeader;


