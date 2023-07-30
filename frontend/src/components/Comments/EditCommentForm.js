import { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux";
import { updateComment } from "../../store/comments";
import { FaPaperPlane } from "react-icons/fa";
import TextareaAutoSize from 'react-textarea-autosize';

const EditCommentForm = ({post, comment, formType, openForm, setOpenForm}) => {
    const dispatch = useDispatch();
    const [body, setBody] = useState("");

    const [clickedOutside, setClickedOutside] = useState(true);
    const ref = useRef();
    const handleClickOutside = e => {
        if (openForm && !ref.current.contains(e.target) && !clickedOutside) {
            setOpenForm(false);
        }
    };
    
    const handleClickInside = () => setClickedOutside(false);
    
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [clickedOutside]);
    
    useEffect(() => {
        handleClickInside()
    }, [])

    useEffect(() => {
        if (formType === "Edit") {
            setBody(comment.body);
        }
    }, [formType]);

    const handleSubmit = () => {
        dispatch(updateComment({
            id: comment.id,
            body: body,
            postId: post.id
        }));
        setOpenForm(false);
    };

    return (
        <div ref={ref}
            onClick={handleClickInside}
            className="edit-comment-input-container">
        { !openForm ? null : (
            <form
                className="edit-comment-form"
                onSubmit={handleSubmit}>
                <TextareaAutoSize
                    className="edit-comment-textarea"
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
                        type="submit">
                            <FaPaperPlane/>
                    </button>
                )}
            </form>
        )}
        </div> 
    );
};

export default EditCommentForm;
