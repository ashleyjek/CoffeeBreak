import { useDispatch, useSelector } from 'react-redux';
import PostFormModal from './PostFormModal';
import './Posts.css';
import { getPosts } from '../../store/posts';
import { useEffect } from 'react';
import { fetchPosts } from '../../store/posts';
import { fetchUsers } from '../../store/users';
import { deletePost } from '../../store/posts';
import { useState } from 'react';
import { openModal } from '../../store/ui';

const Posts = ({currentUser}) => {
    const posts = useSelector(getPosts);
    const allPosts = Object.values(posts).reverse();
    const allUsers = useSelector(state => state.entities.users);
    const dispatch = useDispatch();
    const modalType = useSelector(({ui}) => ui.modal);
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [post, setPost] = useState({});

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

    useEffect(() => {
        dispatch(fetchUsers())
        .then((resp) => {
            if (resp.ok) {
                (dispatch(fetchPosts()));
            }
        });
    }, [dispatch]);

    if (!currentUser) return null;

    return (
        <>
            <div className="create-post-container">
                <img alt="profile-favicon" className="create-post-profile-icon"></img>
                { currentUser && (
                <input 
                    className="create-post-input"
                        placeholder={`What's on your mind, ${currentUser.firstName}?`}
                        onClick={() => dispatch(openModal("Create"))}/>
                    )}
            </div>

            {allPosts.map((post) => 
            <div key={post?.id} className="post-container">
                {/* post container */}
                    { currentUser.id === post.authorId ? (
                        <div className="options-button-container">
                            <button className="open-options-button" onClick={() => setOptionsOpen(!optionsOpen)}>...</button>
                                {optionsOpen ? 
                                    <div className="options-menu">
                                        <button className="edit-post-button" onClick={() => {setPost({post}); dispatch(openModal("Update"))}}>Edit post</button>
                                        {/* <PostFormModal formType={"Edit"} postId={post?.id}/> */}
                                        <button className="delete-post-button" onClick={() => {setPost({post}); dispatch(deletePost(post.id))}} >Move to trash</button>
                                    </div>
                                : null }
                        </div>
                    ) : null }
                <div className="post-header-container">
                    {/* * post-header-container */}
                    <img className="post-profile-icon"> 
                        {/* icon */}
                    </img>
                    <div className="post-details-container">
                        {/* ** post-details-container */}
                        <div className="post-author">{allUsers[post.authorId].firstName} {allUsers[post.authorId].lastName}</div>
                        <div className="post-date-time">{post?.createdAt}</div>
                    </div>
                    {/* <div className="post-edit-button" onClick={() => setModalOpen(true)}>edit
                    </div> */}
                    {/* <div className="post-close-button">close</div> */}
                </div>
                <div className="post-body-container">
                    {/* * post-body-container */}
                    <div className="post-body-text">
                        {/* ** post-body-text */}
                        {post.body}
                    </div>
                </div>
                <div className="post-photo-container">
                    * post-photo-container
                    <div className="post-photo-source">
                        ** post-photo-source
                    </div>
                </div>
                <div className="posts-cmts-ctr-container">
                    * posts-cmts-ctr-container
                    <div className="likes-count">
                        ** like-count
                    </div>
                    <div className="comments-count">
                        ** comments-count
                    </div>
                </div>
                <div className="post-reaction-container">
                    * post-reaction-container
                    <div className="like-button"/>
                        ** like-button
                    <div className="comment-button"/>
                        ** comment-button
                </div>
                <div className="comments-container">
                    COMMENTS COMPONENT
                </div>
            </div>)}
                {FormModal ? (
                    <div className="post-form-modal-bg">
                        <FormModal post={post} currentUser={currentUser}/>
                    </div>
                ) : null }
        </>
    )
}

export default Posts;