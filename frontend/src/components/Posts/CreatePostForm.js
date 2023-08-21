import { openModal } from "../../store/ui";
import { useDispatch } from "react-redux";

const CreatePostForm = ({currentUser, users}) => {
    const dispatch = useDispatch();

    return (
        <div className="create-post-container">
            <a href={'/users/' + currentUser.id}>
                <img 
                    src={users[currentUser.id]?.avatarSrc}
                    className="create-post-profile-icon"></img>
            </a>
                <input 
                    className="create-post-input"
                    placeholder={`What's on your mind?`}
                    onClick={() => dispatch(openModal("create-post"))}/>
        </div>
    )

}

export default CreatePostForm;