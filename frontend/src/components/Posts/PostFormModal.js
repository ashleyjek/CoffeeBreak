import { createPost, updatePost } from "../../store/posts";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/ui";
import { useSelector } from "react-redux";

const PostFormModal = ({post}) => {
    const dispatch = useDispatch();
    const [body, setBody] = useState("");
    const formType = useSelector(({ui}) => ui.modal);

    useEffect(() => {
        if (formType === 'Update') {
            setBody(post.post.body)
        }
    }, [formType])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formType === 'Create') {
            dispatch(createPost({
                body: body
            })).then(setBody(""))
            .then(dispatch(closeModal()));
        } else {
            dispatch(updatePost({
                id: post.post.id,
                body: body
            })).then(setBody(""))
            .then(dispatch(closeModal()));
        }
    }
    return (
        <div className="post-form-modal-container">
            <form>
                <button onClick={() => dispatch(closeModal())}>Close</button>
                <label>{formType} Post</label>
                <input type="textarea" name="body" value={body} onChange={(e) => setBody(e.target.value)}/>
                { body === "" ? 
                (<button className="disabled-button" type="button" disabled>{formType} Post</button>)
                : (<button type="submit" onClick={handleSubmit}>{formType} Post</button>)
                }
            </form>
        </div>
    )
}

export default PostFormModal;