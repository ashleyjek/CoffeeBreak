import SignUpForm from './SignUpForm';
import { useSelector } from 'react-redux';
import './SignUpModal.css';

const SignUpModal = () => {
    const modalType = useSelector(({ui}) => ui.modal);

    let Component;
    switch (modalType) {
        case "sign-up":
            Component = SignUpForm;
            break;
        default:
            Component = null;
            break;
    }

    return (
        <>
        {Component ? (
            <div className="signup-page">
                <Component/>
            </div> ) : null }
        </>
    )
}

export default SignUpModal;