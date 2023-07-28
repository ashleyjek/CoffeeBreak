import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { createComment, updateComment } from "../../store/comments";

const CommentsForm = ({post, comment, formType}) => {
    const dispatch = useDispatch();
    const [formField, setFormField] = useState(false);
    const [body, setBody] = useState("");

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
        } else {
            dispatch(createComment({
                body: body,
                postId: post.id
            }));
            setFormField(!formField);
         }}
debugger
    return (
        <div className="comment-input-container">
            <img className="comments-favicon">
                {/* profile img goes here */}
                </img>
                <form
                    className="comment-input-field">
                        <input 
                            className="comment-input-open"
                            type="textarea"
                            placeholder="Write a comment..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}>
                        </input>
                        { body === "" ? (
                            <button 
                                type="button" 
                                disabled>
                                Submit
                            </button>
                        ) : (
                            <button 
                                type="submit" 
                                onClick={handleSubmit}>Submit
                            </button>
                        )}
                </form>
        </div>
    )
}

export default CommentsForm;
