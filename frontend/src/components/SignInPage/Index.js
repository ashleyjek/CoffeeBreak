import SignInForm from "./SignInForm"
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import './SignInPage.css';
import '../SignUpForm/SignUpModal.css';

const SignInPage = () => {
    const modal = useSelector(state => state.ui.modal);

    return (
    <>
        <div className="signin-container">
            <div className="signin-page">
                <div className="logo-box">
                    <h1>coffeebook</h1>
                    <h2>Connect with coffee lovers around</h2>
                    <h2>the world on Coffeebook.</h2>
                </div>
                <SignInForm/>
            </div>
                <Modal modal={modal}/>
        </div>
        <div className="footer"></div>
    </>
    )
};

export default SignInPage;