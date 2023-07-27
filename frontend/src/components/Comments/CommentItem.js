import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteComment } from '../../store/comments';
import CommentsForm from './CommentsForm';

const CommentItem = ({comment, post}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser);
    const [openForm, setOpenForm] = useState("")
    const [menuOpen, setMenuOpen] = useState(false);

    const openMenu = (e) => {
        if (menuOpen) return;
        e.stopPropagation();
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        if (!menuOpen) return;
        const closeMenu = (e) => {
            setMenuOpen(!menuOpen);
        };
        document.addEventListener('click', closeMenu);
        return () => {
            document.removeEventListener('click', closeMenu)
        };
    }, [menuOpen])

    return (
        <>
        { !openForm ? (
            <h1>{comment.body}</h1>
        ) : (
            <CommentsForm body={comment.body}/>
        )}

        { comment.authorId === currentUser.id ? (
            <div className="comment-options-container">
                <button 
                    className="comment-open-options-button" 
                    onClick={openMenu}>options</button>
                {menuOpen ? 
                    <div className="comment-options-menu">
                        <button 
                            className="comment-edit-button" 
                            onClick={() => {
                                setOpenForm(!openForm)}}>
                                Edit post</button>
                        <button 
                            className="comment-delete-button" 
                            onClick={() => {
                                setMenuOpen(!menuOpen); 
                                dispatch(deleteComment(comment.id))}}> 
                                Move to trash
                            </button>
                            <button 
                                className="close-editor-button"
                                onClick={() => setOpenForm(!openForm)}>
                                    close
                                </button>
                    </div>
                : null }
            </div>
        ) : null }
        </>
    )
}

export default CommentItem;