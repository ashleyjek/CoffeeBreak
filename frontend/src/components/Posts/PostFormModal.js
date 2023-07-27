import { createPost, updatePost } from "../../store/posts";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/ui";
import { useSelector } from "react-redux";
import TextareaAutoSize from 'react-textarea-autosize';


const PostFormModal = ({post, currentUser, formType}) => {
    // debugger
    const dispatch = useDispatch();
    const [body, setBody] = useState("");
    const [openForm, setOpenForm] = useState(formType)
    // const formType = useSelector(({ui}) => ui.modal);

    useEffect(() => {
        if (openForm === 'Update') {
            setBody(post.body)
        } 
        // else {
        //     setOpenForm(null)
        // }
    }, [formType])

    const handleSubmit = () => {
        if (openForm === 'Update') {
            dispatch(updatePost({
                id: post.id,
                body: body
            }))
            setOpenForm(null)
    } else {
        dispatch(createPost({
            body: body
        }))
        setOpenForm(null)
        }
    }

    
    return (
        <div className="post-form-modal-container">
            <form className="post-form">
                <div className="close-modal-button">
                    <button onClick={() => setOpenForm(null)}>X</button>
                </div>
                <div className="form-header">
                    {formType === "Update" ? (<label>Edit post</label>) : 
                    (<label>Create post</label>)}
                </div>
                <div className="form-sub-header">
                    <img className="profile-favicon"></img>
                    <p className="form-user-name">{currentUser.firstName} {currentUser.lastName}</p>
                </div>
                { body === "" ? (
                    <div className="form-body">
                        <TextareaAutoSize className="form-textarea" minRows="1" maxRows="6" name="body" placeholder={`What's on your mind, ${currentUser.firstName}?`} value={body} onChange={(e) => setBody(e.target.value)}/>
                    </div>
                ) : 
                    <div className="form-body">
                        <TextareaAutoSize className="form-textarea" minRows="1" maxRows="6" name="body" value={body} onChange={(e) => setBody(e.target.value)}/>
                    </div>
                }
                <div className="form-img-container">
                    {/* <div className="photo-modal-button">
                        <button onClick={}>X</button>
                    </div> */}
                    {post?.photoSrc ? (<img src={post?.photoSrc}></img>) : null }
                </div>
                <div className="form-icon-container">
                    <div className="icons-label">
                        Add to your post
                    </div>
                </div>
                <div className="form-submit">

                    { body === "" ? 
                    (   <button className="disabled-button" type="button" disabled>Post</button>)
                    : (<button type="submit" onClick={handleSubmit}>Post</button>)
                    }
                </div>
            </form>
        </div>
    )
}

export default PostFormModal;