import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../store/posts';
import { useEffect, useState } from 'react';
import { openModal } from '../../store/ui';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import Comments from '../Comments';
import PostFormModal from './PostFormModal';
import './Posts.css';
import CommentsForm from '../Comments/CommentsForm';


const PostItem = ({post, allUsers}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser)
    const modalType = useSelector(({ui}) => ui.modal);
    const [openForm, setOpenForm] = useState("");
    const [commentForm, setCommentForm] = useState(false);

    const openMenu = (e) => {
        if (menuOpen) return;
        e.stopPropagation();
        setMenuOpen(true);
    };

    useEffect(() => {
        if (!menuOpen) return;
        const closeMenu = (e) => {
            setMenuOpen(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [menuOpen])

    let FormModal;
    switch (modalType) {
        case "Create":
            FormModal = PostFormModal;
            break;
        default:
            FormModal = null;
            break;
    }

    const editClickHandler = () => {
        setMenuOpen(!menuOpen); 
        setOpenForm("Update");
        // dispatch(openModal("Update"));
    }


    return (
        <>
        <div key={post.id} className="post-container">
                    { currentUser.id === post.authorId ? (
                        <div className="options-button-container">
                            <button 
                                className="open-options-button" 
                                    onClick={openMenu}>...</button>
                                {menuOpen ? 
                                    <div className="options-menu">
                                        {/* <button className="edit-post-button" onClick={editClickHandler(post)}>Edit post</button> */}
                                        <button 
                                            className="edit-post-button" 
                                                onClick={editClickHandler}>
                                                    <FaPencilAlt />
                                                    Edit post</button>
                                        {/* <PostFormModal formType={"Edit"} postId={post?.id}/> */} 
                                        {/* <button className="delete-post-button" onClick={deleteClickHandler(post)}>Move to trash</button> */}
                                        <button 
                                            className="delete-post-button" 
                                            onClick={() => {setMenuOpen(!menuOpen); dispatch(deletePost(post.id))}}> <FaRegTrashAlt/> Move to trash</button>
                                    </div>
                                : null }
                        </div>
                    ) : null }
                <div className="post-header-container">
                    <img className="post-profile-icon"> 
                        {/* icon */}
                    </img>
                    <div className="post-details-container">
                        <div className="post-author">{allUsers[post.authorId].firstName} {allUsers[post.authorId].lastName}</div>
                        <div className="post-date-time">{post?.createdAt}</div>
                    </div>
                </div>
                <div className="post-body-container">
                    <div className="post-body-text">
                        {post.body}
                    </div>
                </div>
                {post?.photoSrc ? (
                    <div className="post-photo-container">
                        <div className="post-photo-source">
                            <img src={post.photoSrc}/>
                        </div>
                    </div>
                ) 
                : null }
                {/* <div className="posts-cmts-ctr-container">
        
                    <div className="likes-count">
                
                    </div>
                    <div className="comments-count">
                    
                    </div>
                </div> */}
                <div className="post-reaction-container">
                    <button className="like-button">Like</button>
                    <button className="create-comment-main-button" 
                    onClick={() => setCommentForm(!commentForm)}>Comment</button>
                </div>
                <div className="entire-comments-container">
                    {/* COMMENTS COMPONENT */}
                    <Comments post={post} allUsers={allUsers} />
                    { commentForm ? 
                    <div className="create-comment-container">
                        <CommentsForm post={post} formType={"Create"}/>
                    </div>
                    : <div className="create-comment-container">
                        <div className="comment-input-placeholder">
                            <img className="comments-favicon">
                            {/* profile img goes here */}
                            </img>
                            <button 
                                className="comment-input-container"
                                onClick={() => setCommentForm(!commentForm)}>
                                    Write a comment...
                                </button> 
                                </div>
                        </div> 
                    }
                         
                </div>
            </div>

            {openForm === "Update" ? (
                <div className="post-form-modal-bg-update">
                    <PostFormModal 
                        key={post.id} 
                        post={post} 
                        currentUser={currentUser}
                        formType={openForm}/>
                </div>
            ) : null }

            {modalType === "Create" ? (
                <div className="post-form-modal-bg-create">
                    <PostFormModal 
                        key={post.id} 
                        post={post} 
                        formType={modalType}
                        currentUser={currentUser}/>
                </div>
            ) : null }

        </>
    )
}

export default PostItem;