import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../store/posts';
import { useEffect, useState } from 'react';
import { openModal } from '../../store/ui';
import PostFormModal from './PostFormModal';
import './Posts.css';


const PostItem = ({post, allUsers}) => {
    const [optionsOpen, setOptionsOpen] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser)
    const modalType = useSelector(({ui}) => ui.modal);


    let FormModal;
    switch (modalType) {
        case "Create":
            FormModal = PostFormModal;
            break;
        case "Update":
            FormModal = PostFormModal;
            break;
        default:
            FormModal = null;
            break;
    }

    const editClickHandler = () => {
        setOptionsOpen(!optionsOpen); 
        dispatch(openModal("Update"));
    }


    return (
        <>
        <div key={post.id} className="post-container">
                    { currentUser.id === post.authorId ? (
                        <div className="options-button-container">
                            <button 
                                className="open-options-button" 
                                    onClick={() => setOptionsOpen(!optionsOpen)}>...</button>
                                {optionsOpen ? 
                                    <div className="options-menu">
                                        {/* <button className="edit-post-button" onClick={editClickHandler(post)}>Edit post</button> */}
                                        <button 
                                            className="edit-post-button" 
                                                onClick={editClickHandler}>Edit post</button>
                                        {/* <PostFormModal formType={"Edit"} postId={post?.id}/> */} 
                                        {/* <button className="delete-post-button" onClick={deleteClickHandler(post)}>Move to trash</button> */}
                                        <button 
                                            className="delete-post-button" 
                                            onClick={() => {setOptionsOpen(!optionsOpen); dispatch(deletePost(post.id))}}> Move to trash</button>
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
                    <button className="comment-button">Comment</button>
                </div>
                <div className="comments-container">
                    {/* COMMENTS COMPONENT */}
                </div>
            </div>

            {FormModal ? (
                <div className="post-form-modal-bg">
                    <FormModal 
                        key={post.id} 
                        post={post} 
                        currentUser={currentUser}/>
                </div>
            ) : null }

        </>
    )
}

export default PostItem;