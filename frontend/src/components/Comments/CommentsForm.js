import { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux";
import { createComment, updateComment } from "../../store/comments";
import { FaPaperPlane } from "react-icons/fa";
import TextareaAutoSize from 'react-textarea-autosize';

const CommentsForm = ({post, comment, formType, openForm, setOpenForm}) => {
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
    })
    useEffect(() => {
        if (formType === "Edit") {
            setBody(comment.body);
        }
    }, [formType]);

    const handleSubmit = () => {
        if (formType === "Edit") {
            dispatch(updateComment({
                id: comment.id,
                body: body,
                postId: post.id
            }));
            setOpenForm(false);
        } else {
            dispatch(createComment({
                body: body,
                postId: post.id
            }));
            setOpenForm(false);
        };
    };

    return (
        <div
            ref={ref}
            onClick={handleClickInside}
            className="comment-active-input-container">
            <img className="comments-favicon">
                {/* profile img goes here */}
                </img>
        { !openForm ? null : (
            <form
                onSubmit={handleSubmit}
                className="comment-form">
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
                    // onClick={handleSubmit}
                    > Submit
                    </button>
                )}
            </form>
        )}
        </div> 
    );
};

export default CommentsForm;
