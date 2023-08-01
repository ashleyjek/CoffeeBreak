import SignUpForm from "../SignUpForm/SignUpForm";
import PostFormModal from "../Posts/PostFormModal";
import DeleteCommentModal from "../Comments/DeleteCommentModal";
import PhotoUploaderModal from "../Profile/PhotoUploaderModal";

const Modal = ({modal, post, user}) => {
    if (!modal) {
        return null;
    }

    let component;
    switch(modal) {
        case "sign-up":
            component = <SignUpForm/>
            break;
        case "create-post":
            component = <PostFormModal modal={modal}/>
            break;
        case "edit-post":
            component = <PostFormModal modal={modal} post={post}/>
            break;
        case "delete-comment":
            component = <DeleteCommentModal/>
            break;
        case "update-cover":
            component = <PhotoUploaderModal modal={modal} user={user}/>
            break;
        case "update-avatar":
            component = <PhotoUploaderModal modal={modal} user={user}/>
            break;
        default:
            return null;
    };

    return (
            <div className="modal-bg">
                {component}
            </div>
    )
}

export default Modal;