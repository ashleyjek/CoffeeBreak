import { useDispatch } from "react-redux";
import { useState } from "react"
import { createComment } from "../../store/comments";
import { FaPaperPlane } from "react-icons/fa";
import TextareaAutoSize from 'react-textarea-autosize';

const CreateCommentForm = ({post, inputRef, handleRefClick, currentUser}) => {
    const dispatch = useDispatch();
    const [body, setBody] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createComment({
            body: body,
            postId: post.id
        }));
        setBody("");
    }
    const handleEnterKey = (e) =>{
        if (e.key === 'Enter'){
            handleSubmit(e)
        }
    };

return (

    <form 
        className="create-comment-input"
        onClick={handleRefClick}>
        <img
            src={currentUser?.avatarSrc}
            className="create-comment-avatar"></img>
        <TextareaAutoSize
            className="create-comment-textarea"
            maxRows="6" 
            minRows="1"
            ref={inputRef}
            placeholder="Write a comment..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={handleEnterKey}/>
        { body === "" ? 
            <button type="button" disabled> 
                <FaPaperPlane/> 
                </button> :
            <button 
                onClick={handleSubmit}
                type="button">
                <FaPaperPlane/>
                </button>}
    </form>
)}

export default CreateCommentForm;