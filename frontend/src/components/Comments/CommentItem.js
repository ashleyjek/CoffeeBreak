import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteComment } from '../../store/comments';
import CommentsForm from './CommentsForm';
import './Comments.css'

const CommentItem = ({comment, post}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser);
    const [formType, setFormType] = useState("");
    const [openForm, setOpenForm] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);

    const openMenu = (e) => {
        e.stopPropagation();
        if (menuOpen) return;
        setMenuOpen(true);
    };

    useEffect(() => {
        if (!menuOpen) return;
        const closeMenu = (e) => {
            setMenuOpen(false);
        };
        document.addEventListener('click', closeMenu);
        return () => {
            document.removeEventListener('click', closeMenu)
        };
    }, [menuOpen])

    let menuClass;
    if (!menuOpen) {
        menuClass = "hidden-options"
    }
    else {
        menuClass = "comment-menu"
    }

    return (
        <>
        { !openForm ? (
            <h1>{comment.body}</h1>
        ) : (
            <CommentsForm 
                post={post} 
                comment={comment} 
                formType={formType}/>
        )}

        { comment.authorId === currentUser.id ? (
            <div className="comment-options-container">
                <button 
                    className="comment-open-options-button" 
                    onClick={openMenu}>options</button>
                <div className={menuClass}>
                <button 
                    className="comment-edit-button" 
                    onClick={() => {
                        setFormType("Edit");
                        setOpenForm(!openForm);
                        setMenuOpen(!menuOpen)}}>
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
            </div>
        ) : null }
        </>
    )
}

export default CommentItem;