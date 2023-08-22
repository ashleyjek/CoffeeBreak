import { createPost, deletePhoto, updatePost } from "../../store/posts";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/ui";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import TextareaAutoSize from 'react-textarea-autosize';

const PostFormModal = ({modal, post}) => {
    const allUsers = useSelector(state => state.entities.users);
    const currentUser = useSelector(state => state.session.currentUser);
    const dispatch = useDispatch();
    const [body, setBody] = useState("");
    const [photoFile, setPhotoFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [buttonLabel, setButtonLabel] = useState("Post");
    const [photoUploader, setPhotoUploader] = useState(false);
    const originalRef = useRef();
    const { userId } = useParams();
    const [wallId, setWallId] = useState(null);
        
    useEffect(() => {
        if (modal === 'edit-post') {
            setBody(post.body);
            setButtonLabel("Save");
            setPhotoUrl(post.photoSrc);
            setPhotoUploader(true);
            setWallId(post.profileUserId);
        }
    }, [modal])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = new FormData();
        newPost.append('post[body]', body);
        if (photoFile) {
            newPost.append('post[photo]', photoFile);
        } else if (photoUrl === null) {
            newPost.append('post[photo]', null);
        }
        if (modal === "create-post") {
            if (userId) {
                newPost.append('post[profileUserId]', userId);
            } else {
                newPost.append('post[profileUserId', currentUser.id);
            }
            dispatch(createPost(newPost));
        } else {
            newPost.append('post[id]', post.id);
            dispatch(updatePost(newPost));
        }
        setBody("");
        setPhotoFile(null);
        dispatch(closeModal());
    };

    const handleFile = ({currentTarget}) => {
        const file = currentTarget.files[0];
        setPhotoFile(file);
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => 
                setPhotoUrl(fileReader.result);
        } else {
            setPhotoUrl(null);
        }
    };

    let preview = null;
    if (photoUrl) {
        preview = <img src={photoUrl} alt=""/>;
    }

    const handleRemovePhoto =(e) => {
        e.preventDefault();
        setPhotoFile(null)
        setPhotoUrl(null)
        setPhotoUploader(false)
    }

    return (
        <>
        <div
            onClick={() => dispatch(closeModal())} 
            className="post-modal-bg">
                </div>
            <div className="post-form-modal-container">
                <form className="post-form">
                    <div className="close-modal-button">
                        <button onClick={() => dispatch(closeModal())}>X</button>
                    </div>
                    <div className="form-header">
                        {modal === "edit-post" ? 
                            (<label>Edit post</label>) : 
                            (<label>Create post</label>)}
                    </div>
                    <div className="form-sub-header">
                        <img 
                            src={allUsers[currentUser.id]?.avatarSrc}
                            className="profile-avatar"></img>
                        <p className="form-user-name">
                            {currentUser.firstName} {currentUser.lastName}
                        </p>
                    </div>
                    { body === "" ? (
                        <div className="form-body">
                            <TextareaAutoSize 
                                className="form-textarea"
                                minRows="1"
                                maxRows="6" 
                                name="body" 
                                placeholder={`What's on your mind, ${currentUser.firstName}?`} 
                                value={body} 
                                onChange={(e) => setBody(e.target.value)}/>
                        </div>
                    ) : <div className="form-body">
                            <TextareaAutoSize 
                                className="form-textarea" 
                                minRows="1" 
                                maxRows="6" 
                                name="body" 
                                value={body} 
                                onChange={(e) => setBody(e.target.value)}/>
                        </div> }
                    <div className="form-img-container">
                        { photoUploader ? 
                        <form className="photo-uploader-container">
                            <div className="photo-preview-container">
                                { preview ? preview : 
                                <i className="fa-solid fa-arrow-up-from-bracket fa-2xl"></i>
                                }
                            </div>
                                <input 
                                    ref={originalRef}
                                    className="photo-uploader"
                                    onChange={handleFile}
                                    type="file">
                                </input>
                            <button 
                                className="remove-photo-button"
                                onClick={handleRemovePhoto}>
                                    <i className="fa-solid fa-circle-xmark fa-2xl"/></button>
                        </form>
                        : null }
                    </div>
                    <div className="form-icon-container">
                        <div className="icons-label">
                            Add to your post
                        </div>
                        <img
                            onClick={() => setPhotoUploader(true)} 
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/74AG-EvEtBm.png"/>
                    </div>
                    <div className="form-submit">
                        { body === "" && photoFile === null ? 
                        (<button 
                            className="disabled-button" 
                            type="button" 
                            disabled>
                                {buttonLabel}
                            </button>) :
                        (<button 
                            type="submit" 
                            onClick={handleSubmit}>
                                {buttonLabel}
                            </button> )}
                    </div>
                </form>
            </div>
        </>
    )
}

export default PostFormModal;