import { useDispatch } from 'react-redux';
// import { deleteComment } from '../../store/comments';
import { openModal } from '../../store/ui';
import OutsideAlerter from '../util/OutsideAlerter';
import { FaEllipsisH } from 'react-icons/fa'
import './Comments.css'

const CommentMenu = ({comment, openForm, setOpenForm}) => {
    const dispatch = useDispatch();
    const { 
        ref: menuRef, 
        handleClickInside: handleMenuClickInside, 
        clickedOutside: menuClickedOutside 
    } = OutsideAlerter();

    return (
        <>  
        <div className="button-and-menu-container">
            <button 
                ref={menuRef}
                onClick={handleMenuClickInside}
                className="comment-open-options-button">
                    <FaEllipsisH/>
                </button> 

            { menuClickedOutside ? null :                                  
            <div className="comment-menu-container">
                <div className="comment-menu-contents">
                    <button
                        onClick={() => setOpenForm(!openForm)}
                        className="comment-edit-button">
                            Edit
                        </button>
                    <button 
                        className="comment-delete-button" 
                        onClick={() => {
                            dispatch(openModal("delete-comment", null, comment))}}> 
                            Delete
                        </button>
                </div>
            </div>
        }
        </div>
        </>
    )
}

export default CommentMenu;