import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { createComment, fetchComment } from "../../store/comments";

const CommentsForm = ({post, comment}) => {
    const dispatch = useDispatch();
    const [formField, setFormField] = useState(false);
    const [body, setBody] = useState();

    const handleSubmit = () => {
        dispatch(createComment({
            body: body,
            postId: post.id
        }))
        setFormField(!formField);
    }

    return (
        <div className="comment-input-container">
            <img className="comments-favicon">
                {/* profile img goes here */}
                </img>
            { !formField ?
                <input 
                    className="comment-input-field"
                    type="textarea"
                    placeholder="Write a comment..."
                    onClick={() => setFormField(!formField)}>
                </input>
             : 
                <form
                    className="comment-input-field">
                        <input 
                            className="comment-input-open"
                            type="textarea"
                            placeholder="hello..."
                            onChange={(e) => setBody(e.target.value)}>
                        </input>
                        <button 
                            type="submit" 
                            onClick={handleSubmit}>Submit
                        </button>
                </form>
            }
        </div>
    )
}

export default CommentsForm;
