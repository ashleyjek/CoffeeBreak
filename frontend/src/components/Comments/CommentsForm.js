import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { createComment, updateComment } from "../../store/comments";
import { FaPaperPlane } from "react-icons/fa";
import TextareaAutoSize from 'react-textarea-autosize';
import OutsideAlerter from "../util/OutsideAlerter";


const CommentsForm = ({post, comment, formType, setOpenForm}) => {
    const dispatch = useDispatch();
    const [formField, setFormField] = useState(false);
    const [body, setBody] = useState("");
    
    useEffect(() => {
        if (formField) return;
        const closeMenu = () => {
            // setFormField(false);
            setOpenForm(false)
        }
        document.addEventListener('mousedown', closeMenu);
        return () => document.removeEventListener('mousedown', closeMenu);
    }, [])


    useEffect(() => {
        if (formType === "Edit") {
            setBody(comment.body);
            setFormField(true);
        }
    }, [formType])

    const handleSubmit = (e) => {
        // e.preventDefault();
        if (formType === "Edit") {
            dispatch(updateComment({
                id: comment.id,
                body: body,
                postId: post.id
            }));
            setFormField(!formField);
            setOpenForm(false);
        } else {
            dispatch(createComment({
                body: body,
                postId: post.id
            }));
            setFormField(!formField);
            setOpenForm(false);
        };
    };

    return (
        <div 
        className="comment-active-input-container">
            <img className="comments-favicon">
                {/* profile img goes here */}
                </img>
        { !formField ? null
                    : (
                        <form className="comment-form">
                                <input 
                                    className="comment-input-open"
                                    type="textarea"
                                    placeholder="Write a comment..."
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}/>
                                { body === "" ? (
                                    <button 
                                    type="button" 
                                    disabled>
                                        <FaPaperPlane/>
                                    </button>
                                ) : (
                                    <button 
                                    type="submit" 
                                    onClick={handleSubmit}>Submit
                                    </button>
                                )}
                        </form>

                    )
                    }
        </div> 
    )
}

export default CommentsForm;
