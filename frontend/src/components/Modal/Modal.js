import SignUpForm from "../SignUpForm/SignUpForm";
import PostFormModal from "../Posts/PostFormModal";

const Modal = ({modal}) => {
    if (!modal) {
        return null;
    }

    let component;
    switch(modal) {
        case "sign-up":
            component = <SignUpForm/>
            break;
        case "create-post":
            component = <PostFormModal/>
            break;
        case "edit-post":
            component = <PostFormModal/>
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