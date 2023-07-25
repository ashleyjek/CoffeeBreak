import { createPost } from "../../store/posts";
import { useState } from "react";
import { useDispatch } from "react-redux";


const NewPostForm = () => {
    const dispatch = useDispatch();
    const [body, setBody] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost({
            body: body
        }))
    }
    return (
        <form>
            <input type="textarea" name="body" onChange={(e) => setBody(e.target.value)}/>
            <button onClick={handleSubmit}>Create Post</button>
        </form>
    )
}

export default NewPostForm;